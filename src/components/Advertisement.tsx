
import React from 'react';
import { Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type AdSize = 'small' | 'medium' | 'large';

interface AdvertisementProps {
  size: AdSize;
  title: string;
  content: string;
  imageUrl?: string;
  linkUrl?: string;
}

const Advertisement = ({ size, title, content, imageUrl, linkUrl }: AdvertisementProps) => {
  // Map the size to tailwind classes to maintain the same dimensions
  const sizeClasses = {
    small: 'max-w-[300px] min-h-[100px]',
    medium: 'max-w-[500px] min-h-[150px]',
    large: 'max-w-[800px] min-h-[200px]',
  };
  
  return (
    <Card className={`relative backdrop-blur-md bg-black/80 border-gray-800 ${sizeClasses[size]}`}>
      <div className="absolute top-2 right-2 z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-black/60 text-gray-400 text-xs px-1.5 py-0.5 rounded flex items-center">
              <span className="mr-1">Advertisement</span>
              <Info className="h-3 w-3" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-black/95 border border-gray-800 text-white">
            <p className="text-xs">Sponsored content</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-300">{content}</p>
        
        {imageUrl && (
          <div className="mt-3 mb-2">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto rounded-md" 
            />
          </div>
        )}
      </CardContent>
      
      {linkUrl && (
        <CardFooter className="pt-0">
          <Button 
            variant="link" 
            className="px-0 text-primary hover:text-primary/90 text-sm"
            asChild
          >
            <a 
              href={linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Advertisement;
