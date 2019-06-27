const sharp = require("sharp");
const uuidv4 = require("uuid/v4");

class Resize {
  constructor(destFolder) {
    this.destFolder = destFolder;
  }

  async saveThumbnail(initialFilePath) {
    const resizedFileName = Resize.resizedFileName();
    const filePath = this.resizedFilePath(resizedFileName);

    await sharp(initialFilePath)
      .rotate() // auto-rotated using EXIF Orientation tag
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover // crop to cover both provided dimensions
      })
      .png()
      .toFile(filePath);

    return resizedFileName;
  }

  static resizedFileName() {
    return `${uuidv4()}.png`;
  }

  resizedFilePath(fileName) {
    return `${this.destFolder}/${fileName}`;
  }
}

module.exports = Resize;
