const Chadhava = require("../models/Chadhava");
class ChadhavaService {

  async getAllChadhavas(query) {
    const filter = {};

    if (query.isDeleted !== undefined) {
      filter.isDeleted = query.isDeleted === "true";
    }

    return await Chadhava.find(filter).populate("mandir");
  }

  async getChadhavaById(id) {
    return await Chadhava.findById(id).populate("mandir");
  }

  async updateChadhava(id, data) {
    return await Chadhava.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteChadhava(id) {
    return await Chadhava.findByIdAndDelete(id).populate("mandir");
  }

  async deleteID(id) {
    return await Chadhava.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }
}

module.exports = new ChadhavaService();
