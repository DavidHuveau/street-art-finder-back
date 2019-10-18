const sharp = require("sharp");

const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 200;
const FORMAT_RATIO = 1.77;
const ARTWORK_WIDTH = 1200;
const ARTWORK_HEIGHT = Math.trunc(ARTWORK_WIDTH / FORMAT_RATIO);

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
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        fit: sharp.fit.cover // crop to cover both provided dimensions
      })
      .png()
      .toFile(filePath);

    return resizedFileName;
  }

  async generateArtwork(initialFilePath) {
    const resizedFileName = Resize.extractFileName(initialFilePath);
    const filePath = this.resizedFilePath(resizedFileName);

    const image = sharp(initialFilePath).rotate(); // auto-rotated using EXIF Orientation tag
    const metadata = await image.metadata();
    const isVertical = metadata.width > metadata.height ? false : true;

    await image
      .resize({
        width: isVertical ? ARTWORK_HEIGHT : ARTWORK_WIDTH,
        height: isVertical ? ARTWORK_WIDTH : ARTWORK_HEIGHT,
        // withoutEnlargement: true,
        fit: sharp.fit.cover // crop to cover both provided dimensions
      })
      .jpeg({
        quality: 50, // to prevent chroma subsampling when quality <= 90
        chromaSubsampling: '4:4:4'
      })
      .toFile(filePath);

    return resizedFileName;
  }

  static extractFileName(initialFilePath) {
    return initialFilePath.split("/").pop() + ".jpg";
  }

  resizedFilePath(fileName) {
    return `${this.destFolder}/${fileName}`;
  }
}

module.exports = Resize;
