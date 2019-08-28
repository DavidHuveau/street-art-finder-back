const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();

router.route("/").get(ArtworkController.getPoposals);
router
  .route("/publish/:id")
  .put((req, res) => ArtworkController.updatePublished(req, res, true));
router
  .route("/noPublish/:id")
  .put((req, res) => ArtworkController.updatePublished(req, res, false));

module.exports = router;
