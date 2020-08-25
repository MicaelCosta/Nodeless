//TODO: Confirmar o motivo desta dependencia
//github:badico-cloud-hub/services-container#develop
const container = require('@spark/services-container');

const getImage = require('../controllers/image/get-image');
const putImage = require('../controllers/image/put-image');
const reduceImage = require('../controllers/image/reduce-image');

container.register(getImage);
container.register(putImage);
container.register(reduceImage);

module.exports = container;