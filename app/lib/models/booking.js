import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    travellers: { type: Number, required: true, min: 1 },

    // What the UI displays (e.g. "31 Dec 2025")
    dateLabel: { type: String, required: true },
    // Machine-usable date (optional, but recommended)
    dateISO: { type: Date },

    amountPaise: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },

    status: {
      type: String,
      enum: ["created", "paid", "failed", "cancelled"],
      default: "created",
      index: true,
    },

    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
