const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const uploadToImgBB = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data.data.url; 
  } catch (error) {
    console.error("ImgBB upload error:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
};

module.exports = { uploadToImgBB };
