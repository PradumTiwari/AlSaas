import { handleCheckoutSessionCompleted } from "@/lib/payments";
import { stat } from "fs";
import { NextRequest,NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST=async(req:NextRequest)=>{
    const payload=await req.text();
    const sig=req.headers.get('stripe-signature');
    let event;
    const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        event=stripe.webhooks.constructEvent(payload,sig!,endpointSecret);
        console.log("Event Type",event.type);
        switch(event.type){
            case 'checkout.session.completed':

                console.log("Checkout Session Completed");
                console.log("Seesion",event.data.object);
                
                const sessionId=event.data.object.id;
                console.log("Session ID",sessionId);


                const session=await stripe.checkout.sessions.retrieve(sessionId,{
                    expand:['line_items']
                });
               
                console.log("Expanded Session Line Items session",session);
                await handleCheckoutSessionCompleted({session:session as any,stripe});
                break;
            
            case 'customer.subscription.deleted':
                console.log("Customer subscription deleted");
                
                const subscription=event.data.object;
                console.log(subscription);
                break;    
            
                
            default:
                console.log(`Unhandled Event type ${event.type}`);
        }
    } catch (error) {
        return NextResponse.json({
           error:'Invalid Signature'},
          {status:400}
        );
    }


    return NextResponse.json({
        status:'success',
        message:'Hello From Stripe Api',
    })
}