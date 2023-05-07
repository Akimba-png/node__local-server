const Router = require('express');
const privateController = require('../controllers/private-controller');

const privateRouter = new Router();

privateRouter.get(
  '/items',
  privateController.getItems
);

privateRouter.post(
  '/item',
  privateController.create
);

privateRouter.patch(
  '/item/:id',
  privateController.update
);

privateRouter.delete(
  '/item/:id',
  privateController.delete
);

module.exports = privateRouter;
