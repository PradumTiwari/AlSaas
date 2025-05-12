'use client';

import { Card } from '../ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DeleteButton from './Delete-button';

interface SummaryCardProps {
  summaryCard: {
    id: string;
    title: string | null; // Allow title to be either string or null
    summary_text: string | null;
    original_file_url: string;
  };
  onDelete: (id: string) => void;
}


const SummaryCard = ({ summaryCard, onDelete }: SummaryCardProps) => {
  return (
    <Dialog>
      <Card className="relative p-4 h-full hover:shadow-lg transition-shadow duration-200">
        <div className="absolute top-2 right-2">
          <DeleteButton onDelete={() => onDelete(summaryCard.id)} /> {/* Pass the summary's ID to the delete handler */}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">{summaryCard.title}</h2>
          <a
            href={summaryCard.original_file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-blue-600 hover:text-blue-800"
          >
            Original File URL
          </a>
          {summaryCard.summary_text ? (
            <DialogTrigger asChild>
              <p className="text-sm text-muted-foreground line-clamp-3 cursor-pointer hover:opacity-80">
                {summaryCard.summary_text}
              </p>
            </DialogTrigger>
          ) : (
            <p className="text-sm text-gray-500">No summary available</p>
          )}
        </div>
      </Card>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
        <DialogHeader>
          <DialogTitle>{summaryCard.title}</DialogTitle>
          <DialogDescription>Full summary from your uploaded file.</DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
          {summaryCard.summary_text || 'No summary available for this file.'}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryCard;
