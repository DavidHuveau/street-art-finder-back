const ImageResizer = require("./tools/ImageResizer");

const DEST_FOLDER = "public/thumbnails";

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
    const resizer = new ImageResizer(DEST_FOLDER);
    const thumbnailFilename = await resizer.saveThumbnail(file.path);
    // console.debug(`Thumbnail > ${thumbnailFilename}`);
    req.thumbnailFilename = thumbnailFilename;
    next();
  }
};

module.exports = resize;
