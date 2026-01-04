import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    travellers: Number,
    amount: Number,
    paymentId: String,
}, {
    timestamps: true
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
