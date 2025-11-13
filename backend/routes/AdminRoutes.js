import express from 'express';
import {createSchool,updateSchool,getSchool,createGetInTouch,getLatestContact,getAllContact,getContactDelete,createEventController,viewAllEventsController,updateEventById,DeleteEventController,createEmergencyNoticeController,TotalStaffInWholeSchoolController,ViewAllEmergencyNotice,updateEmergencyNotice,deleteEmergencyNotice,updateStaff,deleteStaff} from '../controller/AdminController.js'
const AdminRouter = express.Router();
AdminRouter.get('/get-school',getSchool);
AdminRouter.put('/update-school',updateSchool)
AdminRouter.post('/create-school',createSchool)
AdminRouter.post('/getInTouchContact',createGetInTouch)
AdminRouter.get('/getInTouchContactLatest',getLatestContact)
AdminRouter.get('/getInTouchContactAllData',getAllContact);
AdminRouter.delete('/deleteContact/:id',getContactDelete);
AdminRouter.post('/createEvents',createEventController);
AdminRouter.get('/viewAllEvents',viewAllEventsController);
AdminRouter.put('/updateEvent/:id',updateEventById);
AdminRouter.delete('/deleteEvent/:id',DeleteEventController)
AdminRouter.post('/createEmergencyNotice',createEmergencyNoticeController);
AdminRouter.get('/viewEmergencyNotice',ViewAllEmergencyNotice)
AdminRouter.put('/updateEmergencyNotice/:id',updateEmergencyNotice)
AdminRouter.get('/TotalStaffWholeSchool',TotalStaffInWholeSchoolController);
AdminRouter.put('/updateStaff/:id',updateStaff);
AdminRouter.delete('/deleteStaff/:id',deleteStaff)
AdminRouter.delete('/deleteEmergencyNotice/:id',deleteEmergencyNotice)
export default AdminRouter;

