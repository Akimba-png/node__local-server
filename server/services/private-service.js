const PrivateModel = require('../models/private-model');
const ApiError = require('../exceptions/api-error');
const ItemDto = require('./../dtos/item-dto');

class PrivateService {
  async create(userId, requestedItem) {
    requestedItem.id = Date.now().toString();
    const storedUserItem = await PrivateModel.findOne(userId);
    if (storedUserItem) {
      storedUserItem.items.push(requestedItem);
      await PrivateModel.updateOne(storedUserItem);
      const itemDto = new ItemDto(requestedItem);
      return itemDto;
    }
    const userItem = {
      userId,
      items: [requestedItem],
    };
    await PrivateModel.create(userItem);
    const itemDto = new ItemDto(requestedItem);
    return itemDto;
  }

  async delete(userId, itemId) {
    const storedUserItem = await PrivateModel.findOne(userId);
    if (!storedUserItem) {
      throw ApiError.badRequest('nothing yet saved here');
    }
    const updatedItems = storedUserItem.items.filter((e) => e.id !== itemId);
    if (storedUserItem.items.length === updatedItems.length) {
      throw ApiError.badRequest('nothing to delete here');
    }
    storedUserItem.items = updatedItems;
    await PrivateModel.updateOne(storedUserItem);
  }

  async getAll(userId, path) {
    const storedUserItem = await PrivateModel.findOne(userId);
    if (!storedUserItem) {
      return [];
    }
    return this.#filterItems(storedUserItem.items, path);
  }

  #filterItems(items, filter) {
    let values = [];
    for (const elem of items) {
      if (elem.systemGroup === filter) {
        const item = new ItemDto(elem);
        values.push(item);
      }
    }
    return values;
  }
}

module.exports = new PrivateService();
