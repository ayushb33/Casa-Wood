"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductQRPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    params.then(p => {
      setId(p.id);
      setUrl(`${window.location.origin}/product/${p.id}`);
    });
  }, [params]);

  if (!id) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back */}
      <div className="flex items-center gap-4 print:hidden">
        <Link
          href={`/dashboard/products/${id}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">Product QR Code</h1>
          <p className="text-sm text-muted-foreground">Print this code for showroom display.</p>
        </div>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" /> Print QR
        </Button>
      </div>

      {/* Printable Area */}
      <div className="border rounded-xl bg-background p-12 shadow-sm flex flex-col items-center justify-center space-y-8 print:border-none print:shadow-none print:pt-20">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter">CASA WOOD</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Scan to view details</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <QRCodeSVG 
            value={url} 
            size={256}
            level="H"
            includeMargin={false}
          />
        </div>
        
        <div className="text-center text-sm text-muted-foreground max-w-sm">
          <p>Scan this QR code with your smartphone camera to add this item to your digital wishlist.</p>
        </div>
      </div>
    </div>
  );
}
