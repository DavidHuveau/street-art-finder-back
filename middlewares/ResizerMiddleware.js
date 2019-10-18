const ImageResizer = require("../tools/ImageResizer");

const THUMBNAILS_FOLDER = "public/thumbnails";
const ARTWORKS_FOLDER = "public/artworks";

const resize = async (req, res, next) => {
  const { file } = req;
  // console.debug(file);

  if (req.fileValidationError)
    res.status(400).send({
      message: req.fileValidationError
    });
  else if (!file)
    res.status(400).send({
      message: "Please provide an image"
    });
  else {
    const resizer1 = new ImageResizer(THUMBNAILS_FOLDER);
    const resizer2 = new ImageResizer(ARTWORKS_FOLDER);

    // Parallel execution with await Promise.all
    // and we wait until both are finished
    Promise.all([
      resizer1.generateThumbnail(file.path),
      resizer2.generateArtwork(file.path)
    ]).then(messages => {
      req.photoFileName = messages[0];
      // console.debug(`>photoFileName: ${req.photoFileName}`);
      next();
    });
  }
};

module.exports = resize;
