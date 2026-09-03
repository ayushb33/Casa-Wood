"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Home, CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWishlistLead } from "@/actions/wishlist";

type ProductSummary = {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  imageUrl?: string;
};

export default function WishlistPage() {
  const [items, setItems] = useState<ProductSummary[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("casawood_wishlist") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(stored);
    setIsClient(true);
  }, []);

  const removeItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem("casawood_wishlist", JSON.stringify(updated));
  };

  const handleClear = () => {
    setItems([]);
    localStorage.removeItem("casawood_wishlist");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const productIds = items.map(i => i.id);
    
    await submitWishlistLead(formData, productIds);
    
    setIsSubmitting(false);
    setSubmitted(true);
    handleClear(); // Clear the list after successful submission
  }

  if (!isClient) return null; // Hydration fix

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            CASA WOOD
          </Link>
          <Link href="/" className="text-sm font-medium hover:underline flex items-center gap-2">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Your Wishlist</h1>
        
        {submitted ? (
          <div className="text-center py-24 space-y-4 max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold">Wishlist Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for sharing your wishlist. One of our specialists will be in touch with you shortly to discuss your selections.
            </p>
            <div className="pt-6">
              <Link href="/" className={buttonVariants({ variant: "default" })}>Return to Home</Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 border rounded-2xl border-dashed">
             <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
             <Link href="/" className={buttonVariants({ variant: "outline" })}>Browse Catalogue</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-xl items-center">
                  <div className="relative w-20 h-20 bg-muted rounded-md shrink-0 overflow-hidden border">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase">{item.categoryName}</p>
                    <Link href={`/product/${item.id}`} className="font-semibold text-lg hover:underline truncate block">
                      {item.name}
                    </Link>
                    <p className="text-sm font-medium mt-1">${item.price?.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-medium">Total Items: {items.length}</p>
                <button onClick={handleClear} className="text-sm text-red-600 hover:underline">Clear List</button>
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-muted/30 border rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="font-semibold mb-4 text-lg">Send to Sales Team</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in your details and we&apos;ll send you a customized quotation for the items in your wishlist.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" required placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea id="notes" name="notes" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Any specific requirements..."></textarea>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Wishlist"}
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
