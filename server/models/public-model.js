const path = require('path');
const dbService = require('./../services/db-service');

class PublicModel {
  static filePath = path.resolve(__dirname, '..', 'database', 'public-db.json');

  static async create(data) {
    await dbService.create(this.filePath, data);
    return data;
  }
}

module.exports = PublicModel;
