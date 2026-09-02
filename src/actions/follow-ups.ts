"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getFollowUps() {
  const now = new Date();
  
  // Reset time to start of day for comparison
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000 - 1);

  const followUps = await db.followUp.findMany({
    where: {
      completedAt: null, // Only active follow-ups
    },
    include: {
      lead: {
        include: {
          customer: true,
        },
      },
      createdBy: {
        select: { id: true, name: true }
      }
    },
    orderBy: {
      scheduledAt: 'asc'
    }
  });

  const overdue = followUps.filter(f => f.scheduledAt < startOfToday);
  const today = followUps.filter(f => f.scheduledAt >= startOfToday && f.scheduledAt <= endOfToday);
  const upcoming = followUps.filter(f => f.scheduledAt > endOfToday);

  return { overdue, today, upcoming };
}

export async function scheduleFollowUp(formData: FormData) {
  const leadId = formData.get("leadId") as string;
  const createdById = formData.get("createdById") as string;
  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;
  const notes = formData.get("notes") as string | null;

  const scheduledAt = new Date(`${dateStr}T${timeStr}:00`);

  await db.followUp.create({
    data: {
      leadId,
      createdById,
      scheduledAt,
      notes,
    },
  });

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/follow-ups");
  return { success: true };
}

export async function completeFollowUp(id: string, leadId: string) {
  await db.followUp.update({
    where: { id },
    data: {
      completedAt: new Date(),
    },
  });

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/follow-ups");
}
