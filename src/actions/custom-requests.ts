"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createNotificationForAll } from "./notifications";

export async function createCustomRequest(formData: FormData) {
  const furnitureType = formData.get("furnitureType") as string;
  const dimensions = formData.get("dimensions") as string | null;
  const materialPreference = formData.get("materialPreference") as string | null;
  const colourPreference = formData.get("colourPreference") as string | null;
  const budgetStr = formData.get("budget") as string | null;
  const description = formData.get("description") as string | null;
  const contactName = formData.get("contactName") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const contactEmail = formData.get("contactEmail") as string | null;

  const budget = budgetStr ? parseFloat(budgetStr) : null;

  // We are not handling image upload yet, so referenceImages is empty []
  const referenceImages: string[] = [];

  // Try to find if this customer already exists by phone
  let customerId = null;
  if (contactPhone) {
    const existing = await db.customer.findFirst({
      where: { phone: contactPhone }
    });
    if (existing) {
      customerId = existing.id;
    }
  }

  await db.customRequest.create({
    data: {
      furnitureType,
      dimensions,
      materialPreference,
      colourPreference,
      budget,
      description,
      contactName,
      contactPhone,
      contactEmail,
      referenceImages,
      customerId,
      status: "PENDING"
    }
  });

  revalidatePath("/dashboard/custom-requests");

  // Notify all admin/staff
  await createNotificationForAll(
    "NEW_CUSTOM_REQUEST",
    "New Custom Furniture Request",
    `${contactName} submitted a custom request for: ${furnitureType}`,
    "/dashboard/custom-requests"
  );

  return { success: true };
}

export async function getCustomRequests() {
  return await db.customRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true
    }
  });
}

export async function getCustomRequestById(id: string) {
  return await db.customRequest.findUnique({
    where: { id },
    include: {
      customer: true
    }
  });
}

export async function convertRequestToLead(requestId: string) {
  const request = await db.customRequest.findUnique({
    where: { id: requestId }
  });

  if (!request) throw new Error("Request not found");
  if (request.leadId) throw new Error("Already converted to lead");

  // Create or update customer
  let customerId = request.customerId;
  if (!customerId) {
    // If not linked yet, try phone or create new
    if (request.contactPhone) {
      let customer = await db.customer.findFirst({
        where: { phone: request.contactPhone }
      });
      if (!customer) {
        customer = await db.customer.create({
          data: {
            name: request.contactName || "Unknown",
            phone: request.contactPhone,
            email: request.contactEmail,
          }
        });
      }
      customerId = customer.id;
    } else {
       throw new Error("Cannot convert to lead without a phone number.");
    }
  }

  // Create Lead
  const notes = `Custom Request for ${request.furnitureType}.\nDimensions: ${request.dimensions || "N/A"}\nBudget: ${request.budget || "N/A"}\nDesc: ${request.description}`;
  
  const lead = await db.lead.create({
    data: {
      customerId: customerId,
      source: "WEBSITE", // Custom Requests come from the website
      status: "NEW",
      notes: notes,
    }
  });

  // Link lead to request
  await db.customRequest.update({
    where: { id: requestId },
    data: {
      leadId: lead.id,
      status: "REVIEWED"
    }
  });

  revalidatePath("/dashboard/custom-requests");
  revalidatePath("/dashboard/leads");
  
  return lead.id;
}
