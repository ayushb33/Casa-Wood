"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";

type ProductSummary = {
  id: string;
  name: string;
  price: number;
  categoryName: string;
};

export default function AddToWishlistButton({ product }: { product: ProductSummary }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check initial state
    const current = JSON.parse(localStorage.getItem("casawood_wishlist") || "[]");
    setIsInWishlist(current.some((item: any) => item.id === product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    const current = JSON.parse(localStorage.getItem("casawood_wishlist") || "[]");
    
    if (isInWishlist) {
      // Remove
      const updated = current.filter((item: any) => item.id !== product.id);
      localStorage.setItem("casawood_wishlist", JSON.stringify(updated));
      setIsInWishlist(false);
    } else {
      // Add
      current.push(product);
      localStorage.setItem("casawood_wishlist", JSON.stringify(current));
      setIsInWishlist(true);
    }
  };

  return (
    <Button 
      onClick={toggleWishlist} 
      variant={isInWishlist ? "outline" : "default"} 
      className={`w-full h-12 text-base gap-2 ${isInWishlist ? 'border-primary text-primary hover:bg-primary/5' : ''}`}
    >
      {isInWishlist ? (
        <>
          <Check className="w-5 h-5" /> Added to Wishlist
        </>
      ) : (
        <>
          <Heart className="w-5 h-5" /> Add to Wishlist
        </>
      )}
    </Button>
  );
}
