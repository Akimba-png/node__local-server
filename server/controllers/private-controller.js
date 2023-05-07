const privateService = require('./../services/private-service');

class PrivateController {
  async getItems(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = req.userData;
      const requestedItem = req.body;
      const createdItem = await privateService.create(user.id, requestedItem);
      res.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const user = req.userData;
      const itemId = req.params.id;
      await privateService.delete(user.id, itemId);
      res.status(200).json({ message: 'item successfully deleted'} );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PrivateController();
