import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import os from "os";

export async function fetchAndExtractPdfText(pdfUrl: string) {
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) throw new Error("Failed to download PDF");

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const tempFilePath = path.join(os.tmpdir(), `${uuidv4()}.pdf`);
    await fs.writeFile(tempFilePath, buffer);

    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();
   console.log("Loaded documents:", docs);
   
    await fs.unlink(tempFilePath);
    return docs.map(doc => doc.pageContent).join("\n");

  } catch (err) {
    console.error("Error loading PDF:", err);
    throw err;
  }
}
