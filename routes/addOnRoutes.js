const express = require("express");
const router = express.Router();
const addOnController = require("../controllers/addOnController");

router.post("/", addOnController.create);
router.get("/", addOnController.getAll);
router.get("/:id", addOnController.getById);
router.put("/:id", addOnController.update);
router.delete("/:id", addOnController.delete);

module.exports = router;
