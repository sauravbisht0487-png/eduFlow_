import Stripe from 'stripe';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Purchase from '../models/Purchase.js';
import { getAuth } from '@clerk/express';
import CourseProgress from '../models/CourseProgress.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get User Data
export const getUserData = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Enrolled Courses
export const userEnrolledCourses = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const userData = await User.findById(userId).populate('enrolledCourses');
    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Purchase Course
export const purchaseCourse = async (req, res) => {
  try {
    console.log('STEP 1: got here');
    const { courseId } = req.body;
    const { userId } = getAuth(req);
    console.log('STEP 2: courseId =', courseId, 'userId =', userId);

    const courseData = await Course.findById(courseId);
    console.log('STEP 3: courseData fetched', !!courseData);

    const userData = await User.findById(userId);
    console.log('STEP 4: userData fetched', !!userData);

    if (!courseData || !userData) {
      return res.json({ success: false, message: 'Data Not Found' });
    }

    if (userData.enrolledCourses.includes(courseData._id)) {
      return res.json({ success: false, message: 'Already enrolled in this course' });
    }

    const discountedPrice = (
      courseData.coursePrice -
      (courseData.discount * courseData.coursePrice) / 100
    ).toFixed(2);
    console.log('STEP 5: discountedPrice =', discountedPrice);

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: discountedPrice,
    };

    const newPurchase = await Purchase.create(purchaseData);
    console.log('STEP 6: purchase created', newPurchase._id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userData.email,
      line_items: [
        {
          price_data: {
            currency: process.env.STRIPE_CURRENCY || 'usd',
            product_data: {
              name: courseData.courseTitle,
              images: courseData.courseThumbnail ? [courseData.courseThumbnail] : [],
            },
            unit_amount: Math.round(discountedPrice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        purchaseId: newPurchase._id.toString(),
        courseId: courseData._id.toString(),
        userId,
      },
    });
    console.log('STEP 7: stripe session created', session.id);

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Purchase error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Update Course Progress (mark a lecture as completed)
export const updateCourseProgress = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { courseId, lectureId } = req.body;

    let progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({ success: true, message: 'Lecture already completed' });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      progressData = await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }

    res.json({ success: true, message: 'Progress updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Course Progress
export const getCourseProgress = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add User Rating to Course
export const addUserRating = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { courseId, rating } = req.body;

    if (!courseId || !rating || rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Invalid course ID or rating' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: 'User has not purchased this course' });
    }

    const existingRatingIndex = course.courseRatings.findIndex((r) => r.userId === userId);

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    res.json({ success: true, message: 'Rating added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};