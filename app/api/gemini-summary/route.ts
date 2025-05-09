import { NextRequest, NextResponse } from "next/server";
import { generateSummaryFromGemini } from "@/lib/geminiai";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' field in request body" }, { status: 400 });
    }

    const summary = await generateSummaryFromGemini(text);
    console.log("Summary in Backend Route Pradum is ",typeof summary);
    
    return new NextResponse(summary,{
      status:200,
      headers:{
        "Content-Type":"text/plain",
      }
    }) ;
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
