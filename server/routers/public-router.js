const Router = require('express');
const publicController = require('./../controllers/public-controller');

const publicRouter = new Router();

publicRouter.get(
  '/item',
  publicController.getItems
);

publicRouter.post(
  '/item',
  publicController.create
);

publicRouter.patch(
  '/item/:id',
  publicController.update
);

publicRouter.delete(
  '/item/:id',
  publicController.delete
);

module.exports = publicRouter;
