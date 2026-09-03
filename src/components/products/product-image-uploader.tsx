"use client";

import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

type UploadedImage = {
  url: string;
  publicId: string;
};

type Props = {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
};

type CloudinaryResult = {
  secure_url: string;
  public_id: string;
};

export default function ProductImageUploader({ images, onChange }: Props) {
  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryResult;
    if (info?.secure_url) {
      onChange([...images, { url: info.secure_url, publicId: info.public_id }]);
    }
  };

  const removeImage = (publicId: string) => {
    onChange(images.filter((img) => img.publicId !== publicId));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={img.publicId} className="relative group aspect-square">
            <Image
              src={img.url}
              alt={`Product image ${idx + 1}`}
              fill
              className="object-cover rounded-lg border"
            />
            {idx === 0 && (
              <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                Primary
              </span>
            )}
            <button
              type="button"
              onClick={() => removeImage(img.publicId)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <CldUploadWidget
          uploadPreset="casawood_products"
          options={{
            multiple: true,
            maxFiles: 10,
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000,
          }}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="w-6 h-6" />
              <span className="text-xs font-medium">Upload</span>
            </button>
          )}
        </CldUploadWidget>
      </div>

      {images.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="w-4 h-4" />
          <span>First uploaded image becomes the primary display image.</span>
        </div>
      )}
    </div>
  );
}
