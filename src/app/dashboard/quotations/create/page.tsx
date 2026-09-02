"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createQuotation } from "@/actions/quotations";

type QuoteItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  productId?: string;
};

export default function CreateQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams?.get("leadId") || "";

  const [items, setItems] = useState<QuoteItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 }
  ]);
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals dynamically
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const total = subtotal - discount + tax;

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadId) {
      alert("Lead ID is missing.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("items", JSON.stringify(items));
    
    try {
      const quoteId = await createQuotation(formData);
      router.push(`/dashboard/quotations/${quoteId}`);
    } catch (err: any) {
      alert(err.message || "Failed to create quotation");
      setIsSubmitting(false);
    }
  };

  if (!leadId) {
    return <div className="p-8 text-center text-red-500">Error: Missing leadId parameter</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/leads/${leadId}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Quotation</h1>
          <p className="text-sm text-muted-foreground">Draft a new pricing proposal</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input type="hidden" name="leadId" value={leadId} />
        
        {/* Line Items */}
        <div className="border rounded-lg bg-background p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Line Items</h2>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <Label>Description</Label>
                  <Input 
                    value={item.description} 
                    onChange={e => updateItem(item.id, 'description', e.target.value)} 
                    placeholder="Product or Service Name" 
                    required 
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label>Qty</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)} 
                    required 
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label>Unit Price ($)</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={item.unitPrice} 
                    onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} 
                    required 
                  />
                </div>
                <div className="w-32 space-y-2 pt-8 text-right">
                  <span className="font-medium text-sm">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                </div>
                <div className="pt-8 pl-2">
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)} 
                    disabled={items.length === 1}
                    className="text-muted-foreground hover:text-red-500 disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={addItem} className="gap-2">
            <Plus className="w-4 h-4" /> Add Item
          </Button>
        </div>

        {/* Financials & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border rounded-lg bg-background p-6 shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes to Customer</Label>
                <textarea id="notes" name="notes" className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Any additional context..."></textarea>
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <textarea id="terms" name="terms" className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Payment terms, delivery timeline..."></textarea>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-background p-6 shadow-sm space-y-6 h-fit">
            <h2 className="text-lg font-semibold">Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <Label htmlFor="discount" className="text-muted-foreground">Discount ($)</Label>
                <Input 
                  id="discount" 
                  name="discount" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={discount} 
                  onChange={e => setDiscount(parseFloat(e.target.value) || 0)} 
                  className="w-32 text-right" 
                />
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="tax" className="text-muted-foreground">Tax ($)</Label>
                <Input 
                  id="tax" 
                  name="tax" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={tax} 
                  onChange={e => setTax(parseFloat(e.target.value) || 0)} 
                  className="w-32 text-right" 
                />
              </div>

              <div className="flex justify-between pt-4 border-t text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Generating Quote..." : "Generate Quotation"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
