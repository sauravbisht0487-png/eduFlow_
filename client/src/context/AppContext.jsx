import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // These come from Clerk.

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch All Published Courses from backend
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to calculate average rating of a course
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // Function to calculate a single lecture's duration
  const calculateLectureDuration = (lecture) => {
    return humanizeDuration(lecture.lectureDuration * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // Function to calculate a single chapter's total time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map(
      (lecture) => (time += lecture.lectureDuration)
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate the entire course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration)
      )
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate number of lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Fetch logged-in user's enrolled courses from backend
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Purchase a course — creates Stripe checkout session and redirects
  const purchaseCourse = async (courseId) => {
    try {
      if (!user) {
        return toast.warn("Please login to purchase this course");
      }

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.replace(data.url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserEnrolledCourses();
    }
  }, [user]);

  useEffect(() => {
  if (user) {
    setIsEducator(user.publicMetadata?.role === "educator");
  } else {
    setIsEducator(false);
  }
}, [user]);

 

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
     setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateLectureDuration,
    enrolledCourses,
    fetchUserEnrolledCourses,
    purchaseCourse,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;