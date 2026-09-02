"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type QuoteItemData = {
  description: string;
  quantity: number;
  unitPrice: number;
  productId?: string;
};

export async function createQuotation(formData: FormData) {
  const leadId = formData.get("leadId") as string;
  const discountStr = formData.get("discount") as string;
  const taxStr = formData.get("tax") as string;
  const notes = formData.get("notes") as string | null;
  const terms = formData.get("terms") as string | null;

  // Items are passed as a JSON string for simplicity in Server Actions
  const itemsJson = formData.get("items") as string;
  const items: QuoteItemData[] = JSON.parse(itemsJson || "[]");

  if (items.length === 0) {
    throw new Error("Quotation must have at least one item.");
  }

  // Calculate totals
  let subtotal = 0;
  const dbItems = items.map(item => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return {
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total,
      productId: item.productId || null
    };
  });

  const discount = discountStr ? parseFloat(discountStr) : 0;
  const tax = taxStr ? parseFloat(taxStr) : 0;
  const total = subtotal - discount + tax;

  // Generate Reference QT-YYYY-XXXX
  const year = new Date().getFullYear();
  const count = await db.quotation.count({
    where: { reference: { startsWith: `QT-${year}` } }
  });
  const reference = `QT-${year}-${String(count + 1).padStart(3, '0')}`;

  const quotation = await db.quotation.create({
    data: {
      leadId,
      reference,
      subtotal,
      discount,
      tax,
      total,
      notes,
      terms,
      status: "DRAFT",
      items: {
        create: dbItems
      }
    }
  });

  // Log activity on the lead
  await db.activity.create({
    data: {
      leadId,
      type: "NOTE",
      title: "Quotation Generated",
      body: `Quotation ${reference} created for $${total.toFixed(2)}.`,
      // Find the first admin as creator if needed, or pass it in. 
      // We will skip createdById by just grabbing any admin for now, 
      // or ideally pass it from the session. 
      // Wait, Activity requires createdById! Let's get the first admin:
      createdById: (await db.user.findFirst({ where: { role: "ADMIN" } }))?.id || ""
    }
  });

  revalidatePath("/dashboard/quotations");
  revalidatePath(`/dashboard/leads/${leadId}`);
  
  return quotation.id;
}

export async function getQuotations() {
  return await db.quotation.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lead: {
        include: { customer: true }
      }
    }
  });
}

export async function getQuotationById(id: string) {
  return await db.quotation.findUnique({
    where: { id },
    include: {
      items: true,
      lead: {
        include: { customer: true }
      }
    }
  });
}

export async function updateQuotationStatus(id: string, status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED") {
  await db.quotation.update({
    where: { id },
    data: { status }
  });
  
  revalidatePath("/dashboard/quotations");
  revalidatePath(`/dashboard/quotations/${id}`);
}
