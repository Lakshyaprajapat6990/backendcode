const Pooja = require("../models/Pooja");
const { uploadToImgBB } = require("./imgbbService");

class PoojaService {

  async getAllPoojas(query) {
    const filter = {};
    
    if (query.isDeleted !== undefined) {
      filter.isDeleted = query.isDeleted === "true";
    }

    return await Pooja.find(filter);
  }

  async getPoojaById(id) {
    return await Pooja.findById(id);
  }

  async deletePooja(id) {
    return await Pooja.findByIdAndDelete(id);
  }

  async deletePoojaID(id) {
    return await Pooja.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }
}

module.exports = new PoojaService();
