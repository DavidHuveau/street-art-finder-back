const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();
const upload = require("../UploadMiddleware");
const resize = require("../ResizerMiddleware");

router
  .route("/")
  .get(ArtworkController.getAll)
  .post(upload.single("myFile"), resize, ArtworkController.create);
// router.route("/search").get(ArtworkController.search);
router.route("/searchByCity").get(ArtworkController.searchByCity);
router.route("/:id").get(ArtworkController.getById);
// .put(ArtworkController.update)
// .delete(ArtworkController.delete);

module.exports = router;
