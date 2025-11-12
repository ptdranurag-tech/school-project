import express from 'express';
import { loginController, registerController } from '../controller/AuthController.js';

const AUthRouter = express.Router();

AUthRouter.post('/register',registerController);
AUthRouter.post('/login',loginController);


export default AUthRouter;