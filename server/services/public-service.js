const PublicModel = require('./../models/public-model');
const ItemDto = require('./../dtos/item-dto');

class PublicService {
  async create(requestedItem) {
    const createdItem = await PublicModel.create(requestedItem);
    const itemDto = new ItemDto(createdItem);
    return itemDto;
  }
}

module.exports = new PublicService();
