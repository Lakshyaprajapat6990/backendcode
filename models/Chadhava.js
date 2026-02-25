const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: {
    url: { type: String },
    delete_url: { type: String },
  },
  // image_hi:{
  //   url: { type: String},
  //   delete_url: { type: String}
  // },
  price: Number,
  description: String,
  descriptionHi: String,
  title: String,
  titleHi: String,
});

const chadhavaSchema = new mongoose.Schema(
  {
    title: String,
    titleHi: String,
    subtitle: String,
    subtitleHi: String,

    desc: String,
    desc_hi: String,

    // mandir: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Temple",
    //   required: true,
    // },
    mandir: String,
    mandirHi: String,
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
    startDate: Date,
    chadhava: Number,
    items: [itemSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chadhava", chadhavaSchema);
