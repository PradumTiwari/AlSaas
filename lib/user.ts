import { prisma } from "./prisma";


export async function getPriceId(email:string){
    try {
        
        const user=await prisma.payment.findFirst({
            where:{
                user_email:email,
                status:'ACTIVE',
            },
            select:{
                price_id:true,
            }
        })

     return user?.price_id  || null;



    } catch (error) {
       console.log('Error fetching user plan:', error);
        
    }
}