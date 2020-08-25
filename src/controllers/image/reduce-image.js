const sharp = require('sharp');

async function reduceImage(image) {
    return await sharp(image.Body)
    .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
    .toFormat('jpeg', { progressive: true, quality: 50 })
    .toBuffer();
}

module.exports = reduceImage;