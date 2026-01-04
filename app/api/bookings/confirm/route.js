import crypto from "crypto";
import { NextResponse } from "next/server";

import dbConnect from "@/app/lib/dbConnect";
import Booking from "@/app/lib/models/booking";

export async function POST(req) {
  try {
    const body = await req.json();

    const bookingId = String(body?.bookingId || "").trim();
    const razorpayPaymentId = String(body?.razorpayPaymentId || "").trim();
    const razorpayOrderId = String(body?.razorpayOrderId || "").trim();
    const razorpaySignature = String(body?.razorpaySignature || "").trim();

    if (!bookingId) {
      return NextResponse.json({ success: false, error: "Missing bookingId." }, { status: 400 });
    }

    // Verify signature only when secret is present and we have all payload fields.
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;
    if (razorpayKeySecret && razorpayPaymentId && razorpayOrderId && razorpaySignature) {
      const expected = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      if (expected !== razorpaySignature) {
        return NextResponse.json({ success: false, error: "Invalid payment signature." }, { status: 400 });
      }
    }

    await dbConnect();

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: "paid",
        razorpayPaymentId: razorpayPaymentId || undefined,
        razorpayOrderId: razorpayOrderId || undefined,
        // Do not store signature unless you explicitly need it.
        razorpaySignature: razorpaySignature || undefined,
        paidAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
