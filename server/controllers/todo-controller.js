const todoService = require('./../services/todo-service');

class TodoController {
  async getTodos(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = req.userData;
      const requestedTodo = req.body;
      const createdTodo = await todoService.create(user.id, requestedTodo);
      res.status(201).json(createdTodo);
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
      const todoId = req.params.id;
      await todoService.delete(user.id, todoId);
      res.status(200).json({ message: 'todo successfully deleted'} );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
