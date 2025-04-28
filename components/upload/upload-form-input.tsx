'use client'
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;  // Fixed typo in type definition
}

const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <section className="flex items-center justify-center py-12 bg-gray-50">
      <form
        className="flex flex-col items-center gap-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={onSubmit}  // Fixed typo in prop
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-rose-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <svg
            className="w-12 h-12 mb-3 text-rose-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0l-4 4m4-4l4 4M20 12h-8m4-4v8"
            />
          </svg>
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF up to 10MB</p>
         <div className='flex justify-end items-center gap-1'>
          <Input id="file" name='file' type="file" accept='application/pdf' required className=''  />
          </div>
        </label>

        <Button type="submit" className="w-full">
          Upload Your File
        </Button>
      </form>
    </section>
  );
};

export default UploadFormInput;
