const bcrypt = require('bcrypt');
const UserModel = require('./../models/user-model');
const UserDto = require('./../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./../services/token-service');

const CRYPT_SALT = 7;

class UserService {
  async signup(name, email, password) {
    const candidate = await UserModel.findOne(email);
    if (candidate) {
      throw ApiError.badRequestError(`email ${email} is already registered`);
    }
    const hashedPassword = await bcrypt.hash(password, CRYPT_SALT);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const createdUser = await UserModel.create(newUser);
    const userDto = new UserDto(createdUser);
    const jwt = tokenService.generateToken({...userDto});
    await tokenService.saveToken(jwt.refreshToken, userDto.id);
    userDto.accessToken = jwt.accessToken;
    return {
      signedUser: userDto,
      refreshToken: jwt.refreshToken,
    };
  }
}

module.exports = new UserService();
