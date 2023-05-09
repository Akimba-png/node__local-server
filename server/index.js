const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user-router');
const publicRouter = require('./routers/public-router');
const privateRouter = require('./routers/private-router');
const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
const pathMiddleware = require('./middlewares/path-middleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', userRouter);
app.use('/public', pathMiddleware, publicRouter);
app.use('/private', authMiddleware, pathMiddleware, privateRouter);
app.use(errorMiddleware);

const appInit = () => {
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

appInit();
