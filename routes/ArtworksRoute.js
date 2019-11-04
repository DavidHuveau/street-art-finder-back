const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();
const uploader = require("../middlewares/UploaderMiddleware");
const resize = require("../middlewares/ResizerMiddleware");

router
  .route("/")
  .get(ArtworkController.getAll)
  .post(uploader("myFile"), resize, ArtworkController.create);
// router.route("/search").get(ArtworkController.search);
router.route("/searchByCity").get(ArtworkController.searchByCity);
router.route("/:id").get(ArtworkController.getById);
// .put(ArtworkController.update)
// .delete(ArtworkController.delete);

module.exports = router;
