const jwt = require('jsonwebtoken');
const TokenModel = require('./../models/token-model');
const ApiError = require('../exceptions/api-error');

class TokenService {
  generateToken(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_KEY, {expiresIn: '10min'});
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY, {expiresIn: '60min'});
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(refreshToken, userId) {
    const savedData = await TokenModel.findOne(userId);
    if (savedData) {
      savedData.refreshToken = refreshToken;
      await TokenModel.updateOne(savedData);
      return;
    }
    const payload = {
      userId,
      refreshToken,
    };
    await TokenModel.create(payload);
  }

  async removeToken(refreshToken) {
    const savedData = await TokenModel.findOne(refreshToken);
    if (!savedData) {
      throw ApiError.badRequest('unknown refreshToken cookies');
    }
    savedData.refreshToken = '';
    await TokenModel.updateOne(savedData);
  }
}

module.exports = new TokenService();
