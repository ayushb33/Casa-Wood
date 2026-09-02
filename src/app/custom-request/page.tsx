"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomRequest } from "@/actions/custom-requests";

export default function CustomRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await createCustomRequest(formData);
    
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            CASA WOOD
          </Link>
          <Link href="/" className="text-sm font-medium hover:underline flex items-center gap-2">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {submitted ? (
          <div className="text-center py-24 space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Request Received!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your bespoke furniture request. Our design team will review your requirements and get in touch with you shortly.
            </p>
            <div className="pt-8">
              <Link href="/" className={buttonVariants({ variant: "default" })}>Return to Homepage</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Bespoke Furniture Request</h1>
              <p className="text-muted-foreground mt-2">
                Can't find exactly what you're looking for? Tell us about your dream piece and we'll craft it for you.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
              
              <div className="space-y-6">
                 <h2 className="text-lg font-semibold border-b pb-2">Furniture Details</h2>
                 <div className="space-y-2">
                   <Label htmlFor="furnitureType">What type of furniture? (Required)</Label>
                   <Input id="furnitureType" name="furnitureType" required placeholder="e.g. Dining Table, Sectional Sofa, Wardrobe" />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="dimensions">Dimensions (Optional)</Label>
                     <Input id="dimensions" name="dimensions" placeholder="e.g. 72'' L x 36'' W x 30'' H" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="budget">Estimated Budget ($) (Optional)</Label>
                     <Input id="budget" name="budget" type="number" placeholder="e.g. 1500" />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="materialPreference">Material Preference (Optional)</Label>
                     <Input id="materialPreference" name="materialPreference" placeholder="e.g. Solid Oak, Velvet, Marble" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="colourPreference">Colour Preference (Optional)</Label>
                     <Input id="colourPreference" name="colourPreference" placeholder="e.g. Walnut finish, Emerald Green" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="description">Detailed Description</Label>
                   <textarea id="description" name="description" className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tell us more about the style, design elements, and functionality you need..."></textarea>
                 </div>
              </div>

              <div className="space-y-6">
                 <h2 className="text-lg font-semibold border-b pb-2">Contact Information</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="contactName">Full Name (Required)</Label>
                     <Input id="contactName" name="contactName" required placeholder="John Doe" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="contactPhone">Phone Number (Required)</Label>
                     <Input id="contactPhone" name="contactPhone" required placeholder="+1 234 567 8900" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="contactEmail">Email Address (Optional)</Label>
                   <Input id="contactEmail" name="contactEmail" type="email" placeholder="john@example.com" />
                 </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Request..." : "Submit Custom Request"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
