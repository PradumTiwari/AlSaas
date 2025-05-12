import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET: Fetch summaries for logged-in user
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const summaries = await prisma.pdfSummary.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(summaries);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching summaries' }, { status: 500 });
  }
}

// POST: Create a new summary
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, summary_text, original_file_url } = body;

    const newSummary = await prisma.pdfSummary.create({
      data: {
        user_id: userId,
        title,
        summary_text,
        original_file_url,
        status: 'NOT_ACTIVE',
      },
    });

    return NextResponse.json(newSummary, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating summary' }, { status: 500 });
  }
}

// DELETE: Delete a summary
export async function DELETE(req: NextRequest) {
  try {
    
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    await prisma.pdfSummary.delete({
      where: { id }
    });
  
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting summary' }, { status: 500 });
  }
}
