const ImageResizer = require("./tools/ImageResizer");

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
    const thumbnailFilename = await resizer1.generateThumbnail(file.path);
    // console.debug(`Thumbnail > ${thumbnailFilename}`);
    req.thumbnailFilename = thumbnailFilename;
    next();
  }
};

module.exports = resize;
