// const ImageResizer = require("./tools/ImageResizer");

const resize = (req, res, next) => {
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
};

module.exports = resize;
