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

const multilingualSchema = new mongoose.Schema(
  {
    lang_type: {
      type: String,
      enum: ["ENGLISH", "HINDI"],
      required: true,
    },
    name: String,
    name_hi: String,

    short_name: String,
    short_name_hi: String,

    location: String,
    location_hi: String,

    cta_text: String,
    cta_text_hi: String,

    tag: String,
    tag_hi: String,
  },
  { _id: false }
);

const creativeSchema = new mongoose.Schema(
  {
    image_md: String,
    image_md_hi: String,

    video_url: String,
    video_url_hi: String,

    types: String,
    types_hi: String,

    lang_type: String,
  },
  { _id: false }
);

const benefitTagSchema = new mongoose.Schema(
  {
    desc: String,
    desc_hi: String,

    types: String,
    types_hi: String,

    lang_type: String,
  },
  { _id: false }
);

const deitySchema = new mongoose.Schema(
  {
    name: String,
    name_hi: String,

    types: String,
    types_hi: String,

    lang_type: String,
  },
  { _id: false }
);

const templeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleHi: String,
    subTitle: String,
    subTitleHi: String,
    location: {
      type: String,
      required: true,
    },
    locationHi: String,

    bhagwan: String,
    bhagwanHi: String,

    templeDescription: String,
    templeDescriptionHi: String,

    longDescription: String,
    longDescriptionHi: String,

    is_active: {
      type: Boolean,
      default: true,
    },

    sequence_number: Number,
    items: [itemSchema],

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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Temple", templeSchema);
