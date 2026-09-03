"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

type ProductImage = {
  id?: string;
  url: string;
  altText?: string | null;
  isPrimary?: boolean;
};

export default function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const selectedImage = images[selectedIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Primary Selected Image Frame */}
      <div
        onClick={() => selectedImage && setIsLightboxOpen(true)}
        className="relative aspect-square rounded-2xl overflow-hidden bg-muted border cursor-zoom-in group"
      >
        {selectedImage ? (
          <>
            <Image
              src={selectedImage.url}
              alt={selectedImage.altText || productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <ImageIcon className="w-12 h-12" />
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.url + idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-muted hover:border-primary/50 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || productName}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && selectedImage && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Large image view */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full h-[85vh]"
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.altText || productName}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 text-center text-white/70 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
