"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function convertQuotationToOrder(quotationId: string, deliveryAddress: string) {
  const quotation = await db.quotation.findUnique({
    where: { id: quotationId },
    include: {
      lead: true
    }
  });

  if (!quotation) throw new Error("Quotation not found");
  if (quotation.status !== "ACCEPTED") throw new Error("Only ACCEPTED quotations can be converted to orders");

  // Generate Reference ORD-YYYY-XXXX
  const year = new Date().getFullYear();
  const count = await db.order.count({
    where: { reference: { startsWith: `ORD-${year}` } }
  });
  const reference = `ORD-${year}-${String(count + 1).padStart(3, '0')}`;

  const order = await db.order.create({
    data: {
      reference,
      status: "CONFIRMED",
      totalAmount: quotation.total,
      paidAmount: 0,
      deliveryAddress,
      customerId: quotation.lead.customerId,
      quotationId: quotation.id,
      notes: `Converted from quotation ${quotation.reference}`
    }
  });

  // Log activity on the lead
  await db.activity.create({
    data: {
      leadId: quotation.leadId,
      type: "NOTE",
      title: "Order Created",
      body: `Order ${reference} created from quotation ${quotation.reference}.`,
      createdById: (await db.user.findFirst({ where: { role: "ADMIN" } }))?.id || ""
    }
  });

  // Update lead status to WON if it's not already
  if (quotation.lead.status !== "WON") {
    await db.lead.update({
      where: { id: quotation.leadId },
      data: { status: "WON" }
    });
  }

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/quotations");
  revalidatePath(`/dashboard/quotations/${quotationId}`);
  
  return order.id;
}

export async function getOrders() {
  return await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      quotation: true
    }
  });
}

export async function getOrderById(id: string) {
  return await db.order.findUnique({
    where: { id },
    include: {
      customer: true,
      quotation: {
        include: {
          items: true
        }
      }
    }
  });
}

export async function updateOrderStatus(id: string, status: "CONFIRMED" | "IN_PRODUCTION" | "READY" | "DELIVERED" | "CANCELLED") {
  await db.order.update({
    where: { id },
    data: { status }
  });
  
  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${id}`);
}

export async function updateOrderPayment(id: string, paidAmount: number) {
  await db.order.update({
    where: { id },
    data: { paidAmount }
  });
  
  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${id}`);
}
