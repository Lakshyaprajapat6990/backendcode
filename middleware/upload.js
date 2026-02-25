
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
    );
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext.match(/\.(jpg|jpeg|png|webp)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"));
  }
};

const upload = multer({ storage, fileFilter });


module.exports = upload;