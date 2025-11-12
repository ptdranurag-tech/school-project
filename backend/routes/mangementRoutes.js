import express from 'express';
import AUthRouter from './AuthRoutes.js';
import AdminRouter from './AdminRoutes.js';
const ManagerRouter = express.Router();

ManagerRouter.use('/auth',AUthRouter);
ManagerRouter.use('/admin',AdminRouter);

export default ManagerRouter;