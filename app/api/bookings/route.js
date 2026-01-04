import crypto from "crypto";
import { NextResponse } from "next/server";

import dbConnect from "@/app/lib/dbConnect";
import Booking from "@/app/lib/models/booking";

function isAuthorized(req) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;

  const headerKey = req.headers.get("x-admin-api-key") || "";
  if (!headerKey) return false;

  try {
    const a = Buffer.from(headerKey);
    const b = Buffer.from(adminKey);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 50), 1), 200);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const skip = (page - 1) * limit;

  await dbConnect();

  const [items, total] = await Promise.all([
    Booking.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "name email travellers dateLabel dateISO amountPaise currency status razorpayOrderId razorpayPaymentId paidAt createdAt updatedAt"
      )
      .lean(),
    Booking.countDocuments({}),
  ]);

  return NextResponse.json({
    success: true,
    page,
    limit,
    total,
    items,
  });
}
