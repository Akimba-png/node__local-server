const PublicModel = require('./../models/public-model');
const ApiError = require('./../exceptions/api-error');
const ItemDto = require('./../dtos/item-dto');

class PublicService {
  async create(requestedItem) {
    const createdItem = await PublicModel.create(requestedItem);
    const itemDto = new ItemDto(createdItem);
    return itemDto;
  }

  async getAll(path) {
    const storedItems = await PublicModel.find(path);
    return storedItems.map((e) => new ItemDto(e));
  }

  async delete(itemId) {
    const storedItems = await PublicModel.find();
    if (!storedItems.length) {
      throw ApiError.badRequest('nothing yet saved here');
    }
    const updatedItems = storedItems.filter((e) => e.id !== itemId);
    if (storedItems.length === updatedItems.length) {
      throw ApiError.badRequest('nothing to delete here');
    }
    await PublicModel.update(updatedItems);
  }

  async update(itemId, data) {
    const storedItems = await PublicModel.find();
    if (!storedItems.length) {
      throw ApiError.badRequest('nothing to update here')
    }
    const itemToUpdate = storedItems.find((e) => e.id === itemId);
    if (!itemToUpdate) {
      throw ApiError.badRequest('unknown item id to update');
    }
    for (const prop in data) {
      if (Object.hasOwn(data, prop)) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = data[prop];
        } else {
          throw ApiError.badRequest('uncorrect data to update');
        }
      }
    }
    await PublicModel.update(storedItems);
    return new ItemDto(itemToUpdate);
  }
}

module.exports = new PublicService();
