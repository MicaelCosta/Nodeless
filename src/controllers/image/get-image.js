const AWS = require('aws-sdk');

const S3 = new AWS.S3();

async function getImage(key) {
    return await S3.getObject({
        Bucket: process.env.bucket,
        Key: key,
    });
}

module.exports = getImage;