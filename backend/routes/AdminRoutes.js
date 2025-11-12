import express from 'express';
import {createSchool,updateSchool,getSchool,createGetInTouch,getLatestContact} from '../controller/AdminController.js'
const AdminRouter = express.Router();
AdminRouter.get('/get-school',getSchool);
AdminRouter.put('/update-school',updateSchool)
AdminRouter.post('/create-school',createSchool)
AdminRouter.post('/getInTouchContact',createGetInTouch)
AdminRouter.get('/getInTouchContactLatest',getLatestContact)
export default AdminRouter;

