
import React from 'react';

type AdSize = 'small' | 'medium' | 'large';

interface AdvertisementProps {
  size: AdSize;
  title: string;
  content: string;
  imageUrl?: string;
  linkUrl?: string;
}

const Advertisement = ({ size, title, content, imageUrl, linkUrl }: AdvertisementProps) => {
  const containerClass = `ad-container-${size}`;
  
  return (
    <div className={containerClass}>
      <span className="ad-label">Advertisement</span>
      <div className="p-3">
        <h4 className="font-medium text-lg mb-2">{title}</h4>
        <p className="text-sm text-gray-300 mb-3">{content}</p>
        
        {imageUrl && (
          <div className="mb-3">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto rounded-md" 
            />
          </div>
        )}
        
        {linkUrl && (
          <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary text-sm hover:underline"
          >
            Learn More →
          </a>
        )}
      </div>
    </div>
  );
};

export default Advertisement;
