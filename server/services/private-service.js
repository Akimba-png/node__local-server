const PrivateModel = require('../models/private-model');
const ApiError = require('../exceptions/api-error');

class PrivateService {
  async create(userId, requestedItem) {
    requestedItem.id = Date.now().toString();
    const storedUserItem = await PrivateModel.findOne(userId);
    if (storedUserItem) {
      storedUserItem.items.push(requestedItem);
      await PrivateModel.updateOne(storedUserItem);
      return requestedItem;
    }
    const userItem = {
      userId,
      items: [requestedItem],
    };
    await PrivateModel.create(userItem);
    return requestedItem;
  }

  async delete(userId, itemId) {
    const storedUserItem = await PrivateModel.findOne(userId);
    const updatedItems = storedUserItem.items.filter((e) => e.id !== itemId);
    if (storedUserItem.items.length === updatedItems.length) {
      throw ApiError.badRequest('nothing to delete here');
    }
    storedUserItem.items = updatedItems;
    await PrivateModel.updateOne(storedUserItem);
  }
}

module.exports = new PrivateService();
