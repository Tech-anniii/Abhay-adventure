import crypto from "crypto";

export async function POST(req) {
    try {
        const { response, orderId } = await req.json();

        const body = orderId + "|" + response.razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === response.razorpay_signature;

        return new Response(JSON.stringify({ success: isAuthentic }));
    } catch (error) {
        console.error("Payment verification error:", error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}
