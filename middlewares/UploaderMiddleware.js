const multer = require("multer");

const ERROR_CODE_FILE_SIZE = "LIMIT_FILE_SIZE";

const fileFilter = (req, file, cb) => {
  // console.log(req.body);
  // console.log(file);

  // supported image file mimetypes
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedMimes.includes(file.mimetype)) {
    req.fileValidationError = "goes wrong on the mimetype...";
    return cb(null, false);
  }
  cb(null, true);
};

const uploader = multer({
  dest: "tmp/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = keyFile => (req, res, next) => {
  uploader.single(keyFile)(req, res, err => {
    if (err instanceof multer.MulterError) {
      if(err.code === ERROR_CODE_FILE_SIZE)
        res.status(500).send({ message: "Picture is too large." });
      else
        res.status(500).send({ message: "Uploade picture failed." });
    } else {
      next(err);
    }
  })
};