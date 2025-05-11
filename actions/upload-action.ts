// upload-action.ts
'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain"; // Adjust path if necessary
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";





export async function generatePdfSummary(uploadResponse: {
  name: string;
  type: string;
  size: number;
  ufsUrl: string;
  key: string;
}[]) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  const { ufsUrl: pdfUrl, name: fileName } = uploadResponse[0];

  if (!pdfUrl || !fileName) {
    return {
      success: false,
      message: "Missing file data",
      data: null,
    };
  }

  try {
    console.log("Goes inside the try block");

    // Extract the PDF text using langchain's fetchAndExtractPdfText
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // console.log("Extracted PDF text:", pdfText);

    return {
      success: true,
      message: "PDF extracted successfully",
      data: {
        title:fileName,
        pdfText
      },
    };
  } catch (error) {
    console.error("Error extracting PDF:", error);
    return {
      success: false,
      message: "Error generating summary",
      data: null,
    };
  }
}



export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}:{
  userId:string;fileUrl:string;title:string;summary:string;fileName:string
}){
  try {
    const res=await prisma.pdfSummary.create({
      data:{
        user_id:userId,
        original_file_url:fileUrl,
        status:"NOT_ACTIVE",
        summary_text:summary,
        title:title,
        file_name:fileName,
        updated_at:new Date(),
      }
    })
    console.log("Respinse on saving",res);
    
    return res;
    
  } catch (error) {
    console.log("Error Saving pdf Summary");
    console.log("Error");
    
    throw error;
    
  }
}

export async function storePdfSummary({ 
      fileUrl,
      summary,
      title,
      fileName}:{
        fileUrl:string;title:string;summary:string;fileName:string
      }){
  try {
    
    const {userId}=await auth();
    if(!userId){
      return {
        success:false,
        message:"user not found"
      }
    }

      let user = await prisma.user.findUnique({ where: { id: userId } });
    
       if (!user) {
      // Optionally fetch more data about the user from Clerk API if needed
      user = await prisma.user.create({
        data: {
          id: userId,
          email: `${userId}@placeholder.com`, // Replace with actual email if available
        },
      });
    }
   const pdfSummary=await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName
    })

    if(pdfSummary){
      return {
        success:true,
        message:'Pdf Summary Saved Sucessfully'
      }
    }
     return {
      success: false,
      message: "Failed to save PDF summary",
    };

  }  catch (error) {
    console.error("Error in storePdfSummary:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error Saving PDF Summary",
    };
  }
}
