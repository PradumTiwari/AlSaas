'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export  const extractSummary=async()=>{
   const {userId}=await auth();
   if(!userId){
    return [];
   }
   const data= await prisma.pdfSummary.findMany({
    where:{
        user_id:userId,
    }
   })
   console.log("All Pdf Summmaries are ",data);
   return data;
}


export const deleteSummary = async (pdfId: string) => {
  try {
     console.log("Hello");
     
    await prisma.pdfSummary.delete({
      where: {
        
        id: pdfId,
      },
    });
  } catch (error) {
    console.log("Error in deleting The summary");
    throw error;
  }
};