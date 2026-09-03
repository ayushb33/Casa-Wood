"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <Button onClick={() => window.print()} variant="outline" className="gap-2">
      <Printer className="w-4 h-4" /> Print / Export to PDF
    </Button>
  );
}
