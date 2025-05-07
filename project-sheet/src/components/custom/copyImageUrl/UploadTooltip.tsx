import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface UploadTooltipProps {
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export default function UploadTooltip({ 
  className = '', 
  side = "top", 
  align = "center" 
}: UploadTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={`cursor-help text-gray-500 ml-2 hover:text-gray-700 ${className}`}>
            <HelpCircle size={22} />
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align} 
          className="w-64 p-3 text-sm"
        >
          <div>
            <p className="mb-2">Before you want to upload any image, please click the upload button and get the URL, then paste the URL here.</p>
            <p className="text-yellow-500 text-xs">Note: Some functionality might not work as expected and errors may occur during the upload process.</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}