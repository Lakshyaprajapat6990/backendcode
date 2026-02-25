const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    nameHi: {
      type: String,
      required: true,
    },
    designationHi: {
      type: String,
      required: true,
    },
    quoteHi: {
      type: String,
      required: true,
    },
    reviewHi: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewsSchema);
