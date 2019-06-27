const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();
const upload = require("../UploadMiddleware");
const resize = require("../ResizerMiddleware");

router
  .route("/")
  .get(ArtworkController.getAll)
  .post(
    upload.single("myFile"),
    resize,
    ArtworkController.create
  );
router.route("/search").get(ArtworkController.search);
router.route("/searchByCity").get(ArtworkController.searchByCity);
router
  .route("/:id")
  .get(ArtworkController.getById)
  .put(ArtworkController.update)
  .delete(ArtworkController.delete);

module.exports = router;

// .post(
//   upload.single("myFile"),
//   async (req, res) => {
//     // console.log(file);
//     const { file } = req;

//     if (req.fileValidationError)
//       res.status(401).json({error: req.fileValidationError});
//     else if(!file)
//       res.status(401).json({error: 'Please provide an image'});
//     else {
//       const destFolder = "public/thumbnails/";
//       const resizer = new Resize(destFolder);
//       const filename = await resizer.saveThumbnail(file.path);
//       return res.json({ name: filename });
//     }

//   }
// );
