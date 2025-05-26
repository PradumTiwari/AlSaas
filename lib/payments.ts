import Stripe from "stripe";
import { prisma } from "./prisma";
type LineItemSession = Stripe.Checkout.Session & {
  line_items: Stripe.ApiList<Stripe.LineItem>;
};

export  const handleCheckoutSessionCompleted=async({
    session,
    stripe
}:{
    session:LineItemSession;
    stripe:Stripe;
})=>{
    console.log("Entered in the paymet lib");
    
 console.log("Checkout Session Completed",session);
 const customerId=session.customer as string;
 const customer=await stripe.customers.retrieve(customerId);
 console.log('Customer',customer);
 
 const priceId=session.line_items?.data[0]?.price?.id;

 if('email' in customer && customer.email){
 const {email,name}=customer;
 await createOrUpdateUser({
    email,
    full_name:name!,
    customer_id:customerId,
    priceId:priceId as string,
    status:'ACTIVE',
 })

 await createPayment({
    session,
    priceId:priceId as string,
    userEmail:email as string,
 })
 }
}



async function createOrUpdateUser({
    email,
    full_name,
    customer_id,
    priceId,
    status,
}:{
    email:string;
    full_name:string;
    customer_id:string;
    priceId:string;
    status:'ACTIVE'|'NOT_ACTIVE'|'PENDING';

}){
    try {

       
        const user=await prisma.user.findUnique({
            where:{
                email,
            },
        })
        if(!user){
         const newUser=await prisma.user.create({
            data:{
               email,
               full_name:full_name,
               customer_id:customer_id,
               status:status,
            }
         })   
        }
        
    } catch (error) {
        console.log("Error creating or updating user",error);
        
    }
}


async function createPayment({session,priceId,userEmail}:{session:Stripe.Checkout.Session, priceId:string, userEmail:string}){
    try {

        const {amount_total,id,customer_email,status}=session;
        const isPresent=await prisma.payment.findFirst({
            where:{
                
                user_email:userEmail,
            }
        })

       if (isPresent) {
      await prisma.payment.update({
          where: { id: isPresent.id }, // Use the actual unique field
             data: {
          status: 'ACTIVE',
      amount: amount_total as GLfloat,
      price_id: priceId,
    },
  });
}

        else{
            const payment=await prisma.payment.create({
            data:{
                id:id,
                stripe_payment_id:session.id,
                amount:amount_total as GLfloat,
                status:'ACTIVE',
                price_id:priceId,
                user_email:userEmail,
            }
        })
        }     
    } catch (error) {
        console.log("Error creating payment",error);
        
    }
}