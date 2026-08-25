import express from 'express';
import {
  getUserData,
  userEnrolledCourses,
  purchaseCourse,
  updateCourseProgress,
  getCourseProgress,
  addUserRating,
} from '../controllers/userController.js';
import { requireAuth } from '@clerk/express';

const userRouter = express.Router();

userRouter.get('/data', requireAuth(), getUserData);
userRouter.get('/enrolled-courses', requireAuth(), userEnrolledCourses);
userRouter.post('/purchase', requireAuth(), purchaseCourse);
userRouter.post('/update-course-progress', requireAuth(), updateCourseProgress);
userRouter.post('/get-course-progress', requireAuth(), getCourseProgress);
userRouter.post('/add-rating', requireAuth(), addUserRating);

export default userRouter;