const TodoModel = require('./../models/todo-model');

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
}

module.exports = new TodoService();
