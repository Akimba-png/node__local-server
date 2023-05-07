const Router = require('express');
const todoController = require('./../controllers/todo-controller');

const todoRouter = new Router();

todoRouter.get(
  '/',
  todoController.getTodos
);

todoRouter.post(
  '/',
  todoController.create
);

todoRouter.patch(
  '/:id',
  todoController.update
);

todoRouter.delete(
  '/:id',
  todoController.delete
);

module.exports = todoRouter;
