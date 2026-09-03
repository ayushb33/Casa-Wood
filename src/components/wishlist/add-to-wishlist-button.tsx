"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";

type ProductSummary = {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  imageUrl?: string;
};

type WishlistEntry = { id: string };

function getWishlist(): WishlistEntry[] {
  return JSON.parse(localStorage.getItem("casawood_wishlist") || "[]");
}

export default function AddToWishlistButton({ product }: { product: ProductSummary }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Read localStorage after mount (client-only)
  useEffect(() => {
    const current = getWishlist();
    const inList = current.some((item) => item.id === product.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInWishlist(inList);
  }, [product.id]);

  const toggleWishlist = () => {
    const current = getWishlist();
    
    if (isInWishlist) {
      const updated = current.filter((item) => item.id !== product.id);
      localStorage.setItem("casawood_wishlist", JSON.stringify(updated));
      setIsInWishlist(false);
    } else {
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
