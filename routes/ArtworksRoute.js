const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  // supported image file mimetypes
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedMimes.includes(file.mimetype)) {
    req.fileValidationError = "goes wrong on the mimetype...";
    // return cb(new Error("goes wrong on the mimetype"));
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "tmp/",
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: fileFilter
});

router
  .route("/")
  .get(ArtworkController.getAll)
  .post(upload.single("myFile"), ArtworkController.create);
router.route("/search").get(ArtworkController.search);
router.route("/searchByCity").get(ArtworkController.searchByCity);
router
  .route("/:id")
  .get(ArtworkController.getById)
  .put(ArtworkController.update)
  .delete(ArtworkController.delete);

module.exports = router;
