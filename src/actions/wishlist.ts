"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitWishlistLead(formData: FormData, productIds: string[]) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string | null;
  const notes = formData.get("notes") as string | null;

  // 1. Find or create the customer by phone
  let customer = await db.customer.findFirst({
    where: { phone },
  });

  if (!customer) {
    customer = await db.customer.create({
      data: {
        name,
        phone,
        email: email || undefined,
      },
    });
  } else if (email && !customer.email) {
    // Optionally update email if they provided one now
    customer = await db.customer.update({
      where: { id: customer.id },
      data: { email }
    });
  }

  // 2. Create the Lead
  const lead = await db.lead.create({
    data: {
      customerId: customer.id,
      source: "QR_CODE", // Matches LeadSource enum
      status: "NEW",
      notes: notes ? `Wishlist submitted with notes: ${notes}` : "Wishlist submitted.",
    },
  });

  // 3. Attach the wishlist products to the lead
  if (productIds && productIds.length > 0) {
    await db.leadProductInterest.createMany({
      data: productIds.map(productId => ({
        leadId: lead.id,
        productId,
      }))
    });
  }

  // 4. Log the activity automatically
  // Since it's from a public user, we find the first admin to attribute this system activity to
  const systemAdmin = await db.user.findFirst({ where: { role: "ADMIN" } });
  
  if (systemAdmin) {
    await db.activity.create({
      data: {
        leadId: lead.id,
        createdById: systemAdmin.id,
        type: "NOTE",
        title: "Wishlist Submitted",
        body: `Customer submitted a wishlist with ${productIds.length} items.`,
      }
    });
  }

  revalidatePath("/dashboard/leads");
  
  return { success: true };
}
