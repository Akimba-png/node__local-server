const publicService = require('./../services/public-service');

class PublicController {
  async getItems(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const requestedItem = req.body;
      requestedItem.systemGroup = req.itemPath;
      const createdItem = await publicService.create(requestedItem);
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

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PublicController();
