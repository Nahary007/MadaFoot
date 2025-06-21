import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <div className="relative">
      {/* Main image */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg cursor-pointer"
        onClick={openLightbox}
      >
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - image ${currentIndex + 1}`} 
          className="w-full h-full object-cover"
        />
        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <button 
            onClick={prevImage}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded ${
              index === currentIndex ? 'ring-2 ring-primary-500' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img 
              src={image} 
              alt={`${alt} - thumbnail ${index + 1}`} 
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl max-h-[80vh] w-full p-4">
            <img 
              src={images[currentIndex]} 
              alt={`${alt} - lightbox image ${currentIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                onClick={prevImage}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black/50 rounded-full px-4 py-2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;