const AWS = require('aws-sdk');
const { basename, extname } = require('path');

const S3 = new AWS.S3();

async function putImage(key, image) {
    await S3.putObject({
        Body: image,
        Bucket: process.env.bucket,
        ContentType: 'image/jpeg',
        Key: `compressed/${basename(key, extname(key))}.jpeg`
    });
}

module.exports = putImage;