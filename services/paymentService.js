const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
class PaymentService {
  async createOrder(amount, participants, mobile, poojaId) {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      orderId: order.id,
      amount: amount,
      currency: order.currency,
      status: "INITIATED",
      participants: participants,
      mobile,
      pooja: poojaId,
    });

    return order;
  }

  async verifyPayment({ orderId, paymentId, signature }) {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return { success: false, message: "Invalid signature" };
    }

    await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, signature, status: "SUCCESS" },
      { new: true }
    );

    return {
      success: true,
      message: "Payment verified successfully",
      
    };
  }
}

module.exports = new PaymentService();
