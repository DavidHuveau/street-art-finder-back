const multer = require("multer");

const fileFilter = (req, file, cb) => {
  // supported image file mimetypes
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedMimes.includes(file.mimetype)) {
    req.fileValidationError = "goes wrong on the mimetype...";
    // return cb(new Error("goes wrong on the mimetype"));
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "tmp/",
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;
