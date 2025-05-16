import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { response, orderId } = await req.json();
        console.log("Response:", response);
        console.log("OrderId:", orderId);

        const body = orderId + "|" + response.razorpay_payment_id;
        console.log("String to sign:", body);

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("Expected signature:", expectedSignature);
        console.log("Received signature:", response.razorpay_signature);

        const isAuthentic = expectedSignature === response.razorpay_signature;

        return new Response(JSON.stringify({ success: isAuthentic }));
    } catch (error) {
        console.error("Payment verification error:", error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}

