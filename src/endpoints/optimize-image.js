const containerOfServices = require('./src/ioc');

const { getImage, putImage, reduceImage } = containerOfServices;

async function handler(event, context){
  const { Records: records } = event;
  //Cada Records representa uma imagem
  //Feito assim pois pode ocorrer mais de um upload simultaneo
  try {
    //Promisse.all vai aguardar todas os awaits do map serem executados
    await Promise.all(records.map(async record => {
      const { key } = record.s3.object;

      const image = await getImage(key).promise();

      const imageOptimized = await reduceImage(image);

      await putImage(key, imageOptimized).promise();
    }));

    return {
      statusCode: 201,
      body: { message: 'ok' }
    };
  } catch (err){
    return err;
  }
}

module.exports = { handler };
