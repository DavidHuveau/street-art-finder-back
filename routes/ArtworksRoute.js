const express = require("express");
const ArtworkController = require("../controllers/ArtworkController");
const router = express.Router();
const upload = require("../UploadMiddleware");

router
  .route("/")
  .get(ArtworkController.getAll)
  .post(
    upload.single("myFile"),
    (req, res, next) => {
      const { file } = req;
      console.debug(file);

      if (req.fileValidationError)
        res.status(400).send({
          message: req.fileValidationError
        });
      else if (!file)
        res.status(400).send({
          message: "Please provide an image"
        });
      else {
        console.debug(`>${file.filename} resized`);
        next();
      }
    },
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
