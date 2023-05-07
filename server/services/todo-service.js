const TodoModel = require('./../models/todo-model');
const ApiError = require('./../exceptions/api-error');

class TodoService {
  async create(userId, { title, isComplete, dateToComplete } ) {
    const newTodo = {
      id: Date.now().toString(),
      title,
      isComplete,
      dateToComplete,
    };
    const storedUserTodo = await TodoModel.findOne(userId);
    if (storedUserTodo) {
      storedUserTodo.todos.push(newTodo);
      await TodoModel.updateOne(storedUserTodo);
      return newTodo;
    }
    const userTodo = {
      userId,
      todos: [newTodo],
    };
    await TodoModel.create(userTodo);
    return newTodo;
  }

  async delete(userId, todoId) {
    const storedUserTodo = await TodoModel.findOne(userId);
    const updatedTodos = storedUserTodo.todos.filter((e) => e.id !== todoId);
    if (storedUserTodo.todos.length === updatedTodos.length) {
      throw ApiError.badRequest('nothing to delete here');
    }
    storedUserTodo.todos = updatedTodos;
    await TodoModel.updateOne(storedUserTodo);
  }
}

module.exports = new TodoService();
