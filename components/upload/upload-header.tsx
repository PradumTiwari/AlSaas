import React from 'react';
import { Sparkles } from 'lucide-react';

const UploadHeader = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <div className="relative inline-flex items-center rounded-full bg-white px-6 py-2 text-base font-medium text-gray-800 shadow-md group-hover:bg-gray-50 transition-colors">
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <span>AI-Powered Content Creation</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Start Uploading Your PDFs
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload your PDF and let our AI do the magic! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadHeader;
