const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED"],
      default: "INITIATED",
    },
     participants: [
      {
        username: { type: String, required: true },
        gotra: { type: String },
      },
    ],
    mobile: { type: String, required: true },
    pooja: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pooja",
      required: true,
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
