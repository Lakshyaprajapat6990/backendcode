const express = require("express");
const router = express.Router();
const templeController = require("../controllers/templeController");
const multer = require("multer");
// const upload = require("../middleware/upload");
const upload = multer({ dest: "/tmp" });

/**
 * @swagger
 * tags:
 *   name: Temples
 *   description: Temple management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Temple:
 *       type: object
 *       required:
 *         - title
 *         - location
 *         - bhagwan
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         title:
 *           type: string
 *           description: Name of the temple
 *         location:
 *           type: string
 *           description: Location of the temple
 *         bhagwan:
 *           type: string
 *           description: Which god the temple is dedicated to
 *         templeDescription:
 *           type: string
 *           description: Short description of the temple
 *         longDescription:
 *           type: string
 *           description: Detailed description of the temple
 *         images:
 *           type: array
 *           maxItems: 5
 *           items:
 *             type: string
 *           description: Max 5 image URLs
 *         language:
 *           type: string
 *           default: english
 *           description: Language of the temple description
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/temples:
 *   get:
 *     summary: Retrieve all temples
 *     tags: [Temples]
 *     responses:
 *       200:
 *         description: List of temples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Temple'
 */
router.get("/", templeController.getAll);

/**
 * @swagger
 * /api/temples/{id}:
 *   get:
 *     summary: Get temple by ID
 *     tags: [Temples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temple'
 *       404:
 *         description: Temple not found
 */
router.get("/:id", templeController.getById);

/**
 * @swagger
 * /api/temples:
 *   post:
 *     summary: Create a new temple (with up to 5 images)
 *     tags: [Temples]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               bhagwan:
 *                 type: string
 *               templeDescription:
 *                 type: string
 *               longDescription:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [english, hindi]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 5 temple images
 *     responses:
 *       201:
 *         description: Temple created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temple'
 *       400:
 *         description: Validation error
 */
// router.post("/", upload.array("images", 5), templeController.create);
router.post(
  "/",
templeController.create
);

/**
 * @swagger
 * /api/temples/{id}:
 *   put:
 *     summary: Update temple (replace metadata + optional images)
 *     tags: [Temples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               bhagwan:
 *                 type: string
 *               templeDescription:
 *                 type: string
 *               longDescription:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [english, hindi]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 5 temple images
 *     responses:
 *       200:
 *         description: Temple updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temple'
 *       404:
 *         description: Temple not found
 */
router.put(
  "/:id",
  templeController.update
);

/**
 * @swagger
 * /api/temples/{id}:
 *   delete:
 *     summary: Delete temple
 *     tags: [Temples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple deleted successfully
 *       404:
 *         description: Temple not found
 */
router.delete("/:id", templeController.delete);
router.delete("/delete/:id",templeController.deleteId)

module.exports = router;
