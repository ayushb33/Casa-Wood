"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { LeadStatus, LeadSource, ActivityType } from "@/generated/prisma/client";

// ── Read ────────────────────────────────────────────────────────────────────

export async function getLeads() {
  return await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      assignedTo: { select: { id: true, name: true, email: true } },
      activities: { orderBy: { createdAt: "desc" }, take: 1 },
      productInterests: { include: { product: true }, take: 3 },
    },
  });
}

export async function getLeadById(id: string) {
  return await db.lead.findUnique({
    where: { id },
    include: {
      customer: true,
      assignedTo: { select: { id: true, name: true, email: true } },
      activities: { orderBy: { createdAt: "desc" } },
      productInterests: { include: { product: true } },
      followUps: { orderBy: { scheduledAt: "asc" } },
    },
  });
}

// ── Create Lead ─────────────────────────────────────────────────────────────

export async function createLead(formData: FormData) {
  const customerName = formData.get("customerName") as string;
  const customerEmail = (formData.get("customerEmail") as string) || null;
  const customerPhone = (formData.get("customerPhone") as string) || null;
  const source = (formData.get("source") as LeadSource) ?? LeadSource.WALK_IN;
  const notes = (formData.get("notes") as string) || null;

  // Try to find an existing customer by phone first
  let customer = customerPhone
    ? await db.customer.findFirst({ where: { phone: customerPhone } })
    : null;

  if (!customer) {
    customer = await db.customer.create({
      data: {
        name: customerName,
        email: customerEmail ?? undefined,
        phone: customerPhone ?? undefined,
      },
    });
  }

  await db.lead.create({
    data: {
      customerId: customer.id,
      source,
      notes,
      status: "NEW",
    },
  });

  revalidatePath("/dashboard/leads");
  return { success: true };
}

// ── Update Status ────────────────────────────────────────────────────────────

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
}

// ── Add Activity / Note ───────────────────────────────────────────────────────
// Note: Activity requires createdById (a user). We pass it from the form.

export async function addLeadActivity(formData: FormData) {
  const leadId = formData.get("leadId") as string;
  const type = (formData.get("type") as ActivityType) ?? ActivityType.NOTE;
  const title = (formData.get("title") as string) || "Note";
  const body = (formData.get("body") as string) || null;
  const createdById = formData.get("createdById") as string;

  await db.activity.create({
    data: {
      leadId,
      type,
      title,
      body,
      createdById,
    },
  });

  revalidatePath(`/dashboard/leads/${leadId}`);
  return { success: true };
}
