const paymentService = require("../services/paymentService");
const Payment = require("../models/Payment");

class PaymentController {
  async createOrder(req, res) {
    try {
      const { amount, participants, mobile, pooja } = req.body;
      console.log("==>req.body", req.body);

      if (!amount || !mobile || !pooja) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (
        !participants ||
        !Array.isArray(participants) ||
        participants.length === 0
      ) {
        return res.status(400).json({ message: "Participants are required" });
      }
      for (const p of participants) {
        if (!p.username || !p.gotra) {
          return res.status(400).json({
            message: "Each participant must have a username and gotra",
          });
        }
      }

      // Razorpay order + Payment save inside service
      const order = await paymentService.createOrder(
        amount,
        participants,
        mobile,
        pooja
      );

      res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async verifyPayment(req, res) {
    try {
      const { orderId, paymentId, signature } = req.body;

      if (!orderId || !paymentId || !signature) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await paymentService.verifyPayment({
        orderId,
        paymentId,
        signature,
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const payments = await Payment.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "poojas",
            localField: "pooja",
            foreignField: "_id",
            as: "pooja",
            pipeline: [{ $project: { title: 1, titleHi: 1 } }],
          },
        },
        { $unwind: { path: "$pooja", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            orderId: 1,
            paymentId: 1,
            signature: 1,
            amount: 1,
            currency: 1,
            status: 1,
            participants: 1,
            mobile: 1,
            pooja: 1,
            createdAt: {
              $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
            },
          },
        },
      ]);
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new PaymentController();
