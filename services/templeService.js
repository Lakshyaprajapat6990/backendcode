const Temple = require("../models/Temple");
const { uploadToImgBB } = require("./imgbbService");
class TempleService {
  async createTemple(data) {
    try {
      const temple = await Temple.create(data);

      return temple;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllTemples(query) {
    const filter = {};

    if (query.isDeleted !== undefined) {
      filter.isDeleted = query.isDeleted === "true";
    }
    return await Temple.find(filter);
  }

  async getTempleById(id) {
    return await Temple.findById(id);
  }

  async updateTemple(id, data) {
    try {
      const updatedTemple = await Temple.findByIdAndUpdate(id, data, {
        new: true,
      });

      return updatedTemple;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTemple(id) {
    return await Temple.findByIdAndDelete(id);
  }

  async deleteTempleID(id) {
    return await Temple.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }
}

module.exports = new TempleService();
