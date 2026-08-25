import express from 'express';

import { requireAuth } from '@clerk/express';
import upload from '../config/multer.js';
import { protectEducator } from '../middleware/authMiddleware.js';
import { addCourse, updateRoleToEducator, getEducatorCourses, educatorDashboardData, getEnrolledStudentsData } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator);

educatorRouter.post('/add-course', requireAuth(), protectEducator, upload.single('image'), addCourse);

educatorRouter.get('/courses', requireAuth(), protectEducator, getEducatorCourses);

educatorRouter.get('/dashboard', requireAuth(), protectEducator, educatorDashboardData);

educatorRouter.get('/enrolled-students', requireAuth(), protectEducator, getEnrolledStudentsData);

export default educatorRouter;