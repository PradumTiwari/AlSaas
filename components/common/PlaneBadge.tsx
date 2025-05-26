import { getPriceId } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { plans } from '../home/Pricing-section';

const PlaneBadge = async() => {
    const user=await currentUser();
   if(!user?.id){
    return null;
   }
    let priceId:string|null=null;
   const email=user?.emailAddresses?.[0].emailAddress;
   if(email){
   const rawPriceId = await getPriceId(email);
  priceId = rawPriceId !== null && rawPriceId !== undefined ? String(rawPriceId) : null;
   }

   let planName = 'Buy a Plan';
   const plan=plans.find((plan)=>plan.priceId===priceId);
   if(plan){
    planName=plan.name;
   }    
  return (
    <div>
        {planName}
    </div>
  )
}

export default PlaneBadge