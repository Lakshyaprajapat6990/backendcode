const express = require("express");
const router = express.Router();
const poojaController = require("../controllers/poojaController");
const multer = require("multer");
// const upload = require('../middleware/upload');
const upload = multer({ dest: "/tmp" });

/**
 * @swagger
 * tags:
 *   name: Poojas
 *   description: Pooja management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceBrief:
 *       type: object
 *       properties:
 *         lang_type:
 *           type: string
 *           enum: [ENGLISH, HINDI]
 *         title:
 *           type: string
 *         short_desc:
 *           type: string
 *         location:
 *           type: string
 *         tag:
 *           type: string
 *         cta_text:
 *           type: string
 *         mandir_name:
 *           type: string
 *         long_desc:
 *           type: string
 *         short_name:
 *           type: string
 *
 *     Pooja:
 *       type: object
 *       required:
 *         - temple
 *       properties:
 *         title:
 *           type: string
 *         titleHi:
 *           type: string
 *         subtitle:
 *           type: string
 *         subtitleHi:
 *           type: string
 *         location:
 *           type: string
 *         locationHi:
 *           type: string
 *         capDate:
 *           type: string
 *           format: date-time
 *         logo_image:
 *           type: string
 *           format: binary
 *         ht_logo_image:
 *           type: string
 *           format: binary
 *         price:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Price'
 *         benefit:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Benefit'
 *         faq:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FAQ'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Upload up to 5 images (English)
 *         images_hi:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Upload up to 5 images (Hindi)
 *         service_brief:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceBrief'
 */

/**
 * @swagger
 * /api/poojas:
 *   post:
 *     summary: Create a new pooja with file uploads
 *     tags: [Poojas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Pooja'
 *     responses:
 *       201:
 *         description: Pooja created successfully
 *       400:
 *         description: Bad request
 */
// router.post(
//   "/",
//   upload.any(),
//   poojaController.create
// );
router.post(
  "/",
  poojaController.create  
);

/**
 * @swagger
 * /api/poojas:
 *   get:
 *     summary: Get all poojas
 *     tags: [Poojas]
 *     responses:
 *       200:
 *         description: List of poojas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pooja'
 */
router.get("/", poojaController.getAll);

/**
 * @swagger
 * /api/poojas/{id}:
 *   get:
 *     summary: Get a pooja by ID
 *     tags: [Poojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pooja ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Pooja details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pooja'
 *       404:
 *         description: Pooja not found
 */
router.get("/:id", poojaController.getById);

/**
 * @swagger
 * /api/poojas/{id}:
 *   put:
 *     summary: Update a pooja by ID with file uploads
 *     tags: [Poojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pooja ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Pooja'
 *     responses:
 *       200:
 *         description: Updated pooja details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pooja'
 *       404:
 *         description: Pooja not found
 */
router.put(
  "/:id",
  poojaController.update
);

/**
 * @swagger
 * /api/poojas/{id}:
 *   delete:
 *     summary: Delete a pooja by ID
 *     tags: [Poojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pooja ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Pooja deleted successfully
 *       404:
 *         description: Pooja not found
 */
router.delete("/:id", poojaController.delete);
router.delete("/delete/:id", poojaController.deleteId);

module.exports = router;
