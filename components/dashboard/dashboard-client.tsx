'use client';

import { useState } from 'react';
import useSWR from 'swr';  // Import SWR hook
import SummaryCard from '@/components/summaries/summary-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { fetcher } from '@/lib/fetcher';  // Fetcher to make API requests

// Define the type for the summary data
interface Summary {
  id: string;
  title: string | null;  // Allow title to be nullable
  summary_text: string | null;
  original_file_url: string|null;
  status: string | null;
  created_at: Date;
  updated_at: Date;
}

export default function DashboardClient({ summaries: initialSummaries }: { summaries: Summary[] }) {
  // Use SWR hook to manage fetching data
 const { data: summaries, error, mutate } = useSWR('/api/summaries', fetcher, {
  fallbackData: initialSummaries,
  refreshInterval: 1000,       // 🔁 Poll the endpoint every 5 seconds
  revalidateOnFocus: true,     // 🔁 Revalidate when tab is refocused
});
  if (error) return <div>Error loading summaries...</div>;
  if (!summaries) return <div>Loading...</div>;

  // Handle delete action
 const handleDelete = async (pdfId: string) => {
  // Optimistically update UI BEFORE making the request
  mutate(
    (currentSummaries: Summary[] = []) =>
      currentSummaries.filter((summary) => summary.id !== pdfId),
    false // do not revalidate immediately
  );

  try {
    const response = await fetch(`/api/summaries`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pdfId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    // Optional: Revalidate after delete to keep DB and UI in sync
    mutate();
  } catch (err) {
    console.error("Delete failed, rolling back...", err);
    // Rollback in case of failure (optional, if you want to handle errors better)
    mutate();
  }
};

  // Handle adding a new summary (e.g., after upload)
  const handleAdd = async (newSummary: Summary) => {
    // Call API to add the new summary
    const response = await fetch('/api/summaries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSummary),
    });

    if (response.ok) {
      const addedSummary = await response.json();
      // Mutate the cache to add the new summary to the list
      mutate((currentSummaries: Summary[]) => [...currentSummaries, addedSummary], false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className="px-2 py-12 sm:py-24">
        <div className="flex gap-4 mb-8 justify-between">
          <div className="flex flex-col gap-2">
            <h1>Your Summaries</h1>
            <p>Transform your PDFs into concise, actionable insights</p>
          </div>
          <Button
            variant="link"
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
          >
            <Link href="/upload" className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" />
              New Summary
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary: Summary) => (
            <SummaryCard
              key={summary.id}
              summaryCard={summary}
              onDelete={() => handleDelete(summary.id)} // Pass delete handler
            />
          ))}
        </div>
      </div>
    </div>
  );
}
