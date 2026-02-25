const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image:{
      url: { type: String},
      delete_url: { type: String}
    },
    image_hi:{
      url: { type: String},
      delete_url: { type: String}
    },
    price: Number,
    description: String,
    descriptionHi: String,
    title: String,
    titleHi: String,
  }
);

const poojaSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    titleHi: { type: String, required: false },
    subtitle: { type: String, required: false },
    subtitleHi: { type: String, required: false },
    location: { type: String, required: false },
    locationHi: { type: String, required: false },
    capDate: { type: Date, required: false },
    logo_image: { type: String, required: false },
    ht_logo_image: { type: String, required: false },
    price: [
      {
        single: {
          amaount: Number,    //spelling is incorrect amount
          description: String,
          descriptionHi: String,
        },
        couple: {
          amaount: Number,       //spelling is incorrect amount
          description: String,
          descriptionHi: String,
        },
        family: {
          amaount: Number,
          description: String,
          descriptionHi: String,
        },
      },
    ],
    benefit: [
      {
        title: { type: String, required: true },
        titleHi: { type: String, required: true },
        description: { type: String, required: true },
        descriptionHi: { type: String, required: true },
      },
    ],
    faq: [
      {
        question: { type: String, required: true },
        questionHi: { type: String, required: true },
        answer: { type: String, required: true },
        answerHi: { type: String, required: true },
      },
    ],
    images: {
      type: [
        {
          url: { type: String, required: true },
          delete_url: { type: String, required: true },
        },
      ],
      validate: [(arr) => arr.length <= 5, "{PATH} exceeds 5"],
    },
    images_hi: {
      type: [
        {
          url: { type: String, required: true },
          delete_url: { type: String, required: true },
        },
      ],
      validate: [(arr) => arr.length <= 5, "{PATH} exceeds 5"],
    },
    items: [itemSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pooja", poojaSchema);
