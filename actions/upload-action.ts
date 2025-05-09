// upload-action.ts
'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain"; // Adjust path if necessary

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
      data: pdfText,
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
