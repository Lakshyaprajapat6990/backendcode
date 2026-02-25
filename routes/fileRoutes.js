const express = require("express");
const Busboy = require("busboy");
const axios = require("axios");
const Pooja = require("../models/Pooja");
const Temple = require('../models/Temple')
const Chadhava = require('../models/Chadhava');

const filesRoutes = express.Router();
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;


function uploadMultipleToImgbb(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });

    const results = {
      images: [],
      imagesHi: []
    };

    const uploadPromises = [];

    busboy.on("file", (fieldname, file, metaData) => {
      const _data = [];
      file.on("data", (data) => _data.push(data));

      file.on("end", () => {
        const buffer = Buffer.concat(_data);
        const base64Image = buffer.toString("base64");

        const promise = axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          new URLSearchParams({
            image: base64Image,
            name: metaData.filename,
          })
        ).then((response) => {
          const fileData = {
            url: response.data.data.url,
            delete_url: response.data.data.delete_url,
          };

          if (fieldname === "imagesHi") {
            results.imagesHi.push(fileData);
          } else if (fieldname === "images") {
            results.images.push(fileData);
          }
        });

        uploadPromises.push(promise);
      });
    });

    busboy.on("finish", () => {
      Promise.all(uploadPromises)
        .then(() => resolve(results))
        .catch(reject);
    });

    busboy.on("error", reject);

    req.pipe(busboy);
  });
}

filesRoutes.post("/getImageUrl", async (req, res) => {
  try {
    const result = await uploadMultipleToImgbb(req);
    res.json({
      status:true,
      images: result.images[0]
    })
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
})

filesRoutes.delete('deleteImage', async (req, res) => {

  // complete the delete image functionality later on when image starts deleting from imgbb as well
})

filesRoutes.post("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const result = await uploadMultipleToImgbb(req);

    var imageUploaded = await Pooja.findByIdAndUpdate(
      id,
      {
        images: result.images.length > 0 ? result.images : undefined,
        images_hi: result.imagesHi.length > 0 ? result.imagesHi : undefined,
      },
      { new: true }
    );

    if (!imageUploaded) {
      res.status(404).json({
        status: false,
        msg: "Puja not found or failed to upload images"
      });
    }

    res.json({
      status: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
});

filesRoutes.post("/:id/templeImage", async (req, res) => {
  try {
    var id = req.params.id;
    const result = await uploadMultipleToImgbb(req);

    var imageUploaded = await Temple.findByIdAndUpdate(
      id,
      {
        images: result.images.length > 0 ? result.images : undefined,
        images_hi: result.imagesHi.length > 0 ? result.imagesHi : undefined,
      },
      { new: true }
    );

    if (!imageUploaded) {
      res.status(404).json({
        status: false,
        msg: "Temple not found or failed to upload images"
      });
    }

    res.json({
      status: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
});

filesRoutes.post("/:id/chadhavaImage", async (req, res) => {
  try {
    var id = req.params.id;
    const result = await uploadMultipleToImgbb(req);

    var imageUploaded = await Chadhava.findByIdAndUpdate(
      id,
      {
        images: result.images.length > 0 ? result.images : undefined,
        images_hi: result.imagesHi.length > 0 ? result.imagesHi : undefined,
      },
      { new: true }
    );

    if (!imageUploaded) {
      res.status(404).json({
        status: false,
        msg: "Chadhava not found or failed to upload images"
      });
    }

    res.json({
      status: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
});


filesRoutes.delete('/:id/pooja/:imageId', async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const puja = await Pooja.findById(id);
    if (!puja) {
      return res.status(404).json({ status: false, msg: "Puja not found" });
    }

    const imageDoc =
      puja.images.find(img => img._id.toString() === imageId) ||
      puja.images_hi.find(img => img._id.toString() === imageId);

    if (!imageDoc) {
      return res.status(404).json({ status: false, msg: "Image not found" });
    }

    await Pooja.updateOne(
      { _id: id },
      {
        $pull: {
          images: { _id: imageId },
          images_hi: { _id: imageId }
        }
      }
    );

    res.json({ status: true, msg: "Image deleted successfully" });

  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
});

filesRoutes.delete('/:id/temple/:imageId', async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const temple = await Temple.findById(id);
    if (!temple) {
      return res.status(404).json({ status: false, msg: "Temple not found" });
    }

    const imageDoc =
      temple.images.find(img => img._id.toString() === imageId) ||
      temple.images_hi.find(img => img._id.toString() === imageId);

    if (!imageDoc) {
      return res.status(404).json({ status: false, msg: "Image not found" });
    }

    await Temple.updateOne(
      { _id: id },
      {
        $pull: {
          images: { _id: imageId },
          images_hi: { _id: imageId }
        }
      }
    );

    res.json({ status: true, msg: "Image deleted successfully" });

  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
});


filesRoutes.delete('/:id/chadhava/:imageId', async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const chadhava = await Chadhava.findById(id);
    if (!chadhava) {
      return res.status(404).json({ status: false, msg: "Chadhava not found" });
    }

    const imageDoc =
      chadhava.images.find(img => img._id.toString() === imageId) ||
      chadhava.images_hi.find(img => img._id.toString() === imageId);

    if (!imageDoc) {
      return res.status(404).json({ status: false, msg: "Image not found" });
    }

    await Chadhava.updateOne(
      { _id: id },
      {
        $pull: {
          images: { _id: imageId },
          images_hi: { _id: imageId }
        }
      }
    );

    res.json({ status: true, msg: "Image deleted successfully" });

  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
});


module.exports = filesRoutes;
