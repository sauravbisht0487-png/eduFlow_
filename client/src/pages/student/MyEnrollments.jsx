     import React, { useContext, useEffect, useState } from "react";
import { Line } from "rc-progress";
import { AppContext } from "../../context/AppContext";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    fetchUserEnrolledCourses,
    calculateCourseDuration,
    calculateNoOfLectures,
    navigate,
  } = useContext(AppContext);

  // progressArray[i] = { lectureCompleted, totalLectures } for enrolledCourses[i]
  const [progressArray, setProgressArray] = useState([]);

  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  useEffect(() => {
    const getCourseProgress = async () => {
      if (!Array.isArray(enrolledCourses) || enrolledCourses.length === 0) {
        setProgressArray([]);
        return;
      }

      // TODO: replace with a real API call per course once the backend
      // tracks lecture completion, e.g.:
      // const { data } = await axios.post('/api/user/get-course-progress', { courseId: course._id })
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = 0; // placeholder until real progress data exists
          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    };

    getCourseProgress();
  }, [enrolledCourses]);

  return (
    <>
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      {!Array.isArray(enrolledCourses) || enrolledCourses.length === 0 ? (
        <p className="text-gray-500 mt-6">
          You haven't enrolled in any courses yet.
        </p>
      ) : (
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-md:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-14 sm:w-24 md:w-28 rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="mb-1 text-sm sm:text-base truncate">
                      {course.courseTitle}
                    </p>

                    {/* Shown only on small screens, since the Duration/Completed columns are hidden below md */}
                    <p className="text-xs text-gray-500 md:hidden">
                      {calculateCourseDuration(course)} ·{" "}
                      {progressArray[index]?.lectureCompleted ?? 0}/
                      {progressArray[index]?.totalLectures ??
                        calculateNoOfLectures(course)}{" "}
                      lectures
                    </p>

                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                      strokeColor="#2563eb"
                      trailColor="#d1d5db"
                      className="mt-1"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-md:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-md:hidden">
                  {progressArray[index]
                    ? `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`
                    : `0 / ${calculateNoOfLectures(course)}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 text-right md:text-left">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded whitespace-nowrap"
                  >
                    On Going
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
   
    </div>
    <Footer/>
    </>
  );
};

export default MyEnrollments;       