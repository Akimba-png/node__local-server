const validationService = require('./../services/validation-service');
const userService = require('./../services/user-service');

class UserController {
  async signup(req, res, next) {
    try {
      validationService.validateRequest(req);
      const { name, email, password } = req.body;
      const { signedUser, refreshToken } = await userService.signup(name, email, password);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      res.status(201).json(signedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
