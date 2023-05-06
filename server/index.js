const express = require('express');
const userRouter = require('./routers/user-router');
const errorMiddleware = require('./middlewares/error-middleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', userRouter);
app.use(errorMiddleware);

const appInit = () => {
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

appInit();
