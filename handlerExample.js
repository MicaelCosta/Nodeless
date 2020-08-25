'use strict';

const AWS = require('aws-sdk');
const sharp = require('sharp');
const { basename, extname } = require('path');

const S3 = new AWS.S3();

module.exports.handle = async (event, context) => {
  const { Records: records } = event;
  //Cada Records representa uma imagem
  //Feito assim pois pode ocorrer mais de um upload simultaneo
  try {
    //Promisse.all vai aguardar todas os awaits do map serem executados
    await Promise.all(records.map(async record => {
      const { key } = record.s3.object;

      const image = await S3.getObject({
        Bucket: process.env.bucket,
        Key: key,
      }).promise();

      const optimized = await sharp(image.Body)
      .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { progressive: true, quality: 50 })
      .toBuffer();

      await S3.putObject({
        Body: optimized,
        Bucket: process.env.bucket,
        ContentType: 'image/jpeg',
        Key: `compressed/${basename(key, extname(key))}.jpeg`
      }).promise();
    }));

    return {
      statusCode: 201,
      body: {  }
    };
  } catch (err){
    return err;
  }
};
