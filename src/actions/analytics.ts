"use server";

import { db } from "@/lib/db";

export async function getDashboardAnalytics() {
  const [
    totalLeads,
    wonLeads,
    todayFollowUps,
    totalQuotations,
    totalOrders,
    orderRevenueResult,
    leadSources
  ] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { status: "WON" } }),
    db.followUp.count({
      where: {
        scheduledAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        },
        completedAt: null
      }
    }),
    db.quotation.count(),
    db.order.count(),
    db.order.aggregate({
      _sum: {
        totalAmount: true,
        paidAmount: true
      }
    }),
    db.lead.groupBy({
      by: ['source'],
      _count: {
        source: true
      }
    })
  ]);

  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
  
  const revenue = orderRevenueResult._sum.totalAmount || 0;
  const collected = orderRevenueResult._sum.paidAmount || 0;

  return {
    totalLeads,
    wonLeads,
    conversionRate,
    todayFollowUps,
    totalQuotations,
    totalOrders,
    revenue,
    collected,
    leadSources
  };
}
