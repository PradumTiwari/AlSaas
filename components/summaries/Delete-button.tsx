import React from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => void; // Delete function passed from the parent
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <Button
      variant="destructive"
      className="text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 shadow-md hover:shadow-lg active:shadow-xl transition-all duration-300 w-8 h-8 p-0 rounded-lg flex items-center justify-center"
      onClick={onDelete} // Call the onDelete function
    >
      <X className="w-4 h-4" />
    </Button>
  );
};

export default DeleteButton;
