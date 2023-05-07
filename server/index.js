const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user-router');
const todoRouter = require('./routers/todo-router');
const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);
app.use('/todo', authMiddleware, todoRouter);
app.use(errorMiddleware);

const appInit = () => {
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

appInit();
