"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NotificationType } from "@/generated/prisma/enums";

// Helper to broadcast a notification to all admins/staff
export async function createNotificationForAll(
  type: NotificationType,
  title: string,
  body: string,
  link?: string
) {
  const users = await db.user.findMany({ select: { id: true } });
  
  if (users.length === 0) return;

  await db.notification.createMany({
    data: users.map(user => ({
      userId: user.id,
      type,
      title,
      body,
      link
    }))
  });
}

export async function getNotificationsForUser(userId: string) {
  return await db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}

export async function getUnreadCountForUser(userId: string) {
  try {
    return await db.notification.count({
      where: { userId, isRead: false }
    });
  } catch (error) {
    console.error("Failed to fetch unread notification count:", error);
    return 0;
  }
}

export async function markAllRead(userId: string) {
  await db.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
  revalidatePath("/dashboard/notifications");
}

export async function markNotificationRead(id: string) {
  await db.notification.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath("/dashboard/notifications");
}
