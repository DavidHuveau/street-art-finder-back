const sharp = require("sharp");

class Resize {
  constructor(destFolder) {
    this.destFolder = destFolder;
  }

  async generateThumbnail(initialFilePath) {
    const resizedFileName = Resize.extractFileName(initialFilePath);
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

  async generateArtwork(initialFilePath) {
    const resizedFileName = Resize.extractFileName(initialFilePath);
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

  static extractFileName(initialFilePath) {
    return initialFilePath.split("/").pop() + ".png";
  }

  resizedFilePath(fileName) {
    return `${this.destFolder}/${fileName}`;
  }
}

module.exports = Resize;
