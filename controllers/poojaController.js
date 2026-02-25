const poojaService = require("../services/poojaService");
const Pooja = require("../models/Pooja"); 

class PoojaController {
  async create(req, res) {
    try {
      const puja = await Pooja.create(req.body)
      res.status(201).json({
        status: true,
        message: "Puja created successfully",
        data: puja,
      });
    } catch (error) {
      res
        .status(400)
        .json({
          status: false,
          message: error.message || "Something went wrong",
        });
    }
  }

  async getAll(req, res) {
    try {
      const poojas = await poojaService.getAllPoojas(req.query);
      res.json(poojas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const pooja = await poojaService.getPoojaById(req.params.id);
      if (!pooja) return res.status(404).json({ message: "Pooja not found" });
      res.json(pooja);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      var id = req.params.id
      const pooja = await Pooja.findByIdAndUpdate(
        {_id:id},
        req.body,
        {new:true}
      )
      if (!pooja) return res.status(404).json({ message: "Pooja not found" });
      res.json(pooja);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const pooja = await poojaService.deletePooja(req.params.id);
      if (!pooja) return res.status(404).json({ message: "Pooja not found" });
      res.json({ message: "Pooja deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteId(req, res) {
    try {
      const pooja = await poojaService.deletePoojaID(req.params.id);
      if (!pooja) {
        return res.status(404).json({ message: "Pooja not found" });
      }
      res.json({ message: "Pooja  deleted successfully", pooja });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAllPoojas(req, res) {
    try {
      const poojas = await poojaService.getAllPoojas();
      res.json(poojas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PoojaController();
