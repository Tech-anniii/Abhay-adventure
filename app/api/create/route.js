import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import dbConnect from "@/app/lib/dbConnect";
import Booking from "@/app/lib/models/booking";

export async function POST(req) {
  try {
    const body = await req.json();

    const amountPaise = Number(body?.amount);
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const dateLabel = String(body?.date || "").trim();
    const travellers = Number(body?.travellers);
    const dateISO = body?.dateISO ? new Date(body.dateISO) : undefined;

    if (!name || !email || !dateLabel || !Number.isFinite(travellers) || travellers < 1) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid booking fields." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amountPaise) || amountPaise < 0) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid amount." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Support both server-only and NEXT_PUBLIC naming to avoid misconfiguration.
    // NOTE: Only the secret must remain server-only.
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    // Back-compat: some setups use RAZORPAY_SECRET.
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

    let order = null;
    if (razorpayKeyId && razorpayKeySecret) {
      const instance = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      });

      order = await instance.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: `booking_${Date.now()}`,
      });
    }

    const booking = await Booking.create({
      name,
      email,
      travellers,
      dateLabel,
      dateISO,
      amountPaise,
      currency: "INR",
      status: "created",
      razorpayOrderId: order?.id,
    });

    return NextResponse.json({
      success: true,
      bookingId: String(booking._id),
      keyId: razorpayKeyId || null,
      // Razorpay fields expected by the client
      id: order?.id,
      amount: order?.amount ?? amountPaise,
      currency: order?.currency ?? "INR",
      razorpayConfigured: Boolean(order?.id),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
