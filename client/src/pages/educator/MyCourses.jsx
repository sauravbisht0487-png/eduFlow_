import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyEducatorData } from "../../assets/assets";

const MyCourses = () => {
  const { allCourses, currency } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    // TODO: replace with real API call once backend is ready
    // Filters allCourses (from dummyCourses) down to ones belonging to this educator
    const educatorCourses = allCourses.filter(
      (course) => course.educator === dummyEducatorData._id
    );
    setCourses(educatorCourses);
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchEducatorCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCourses]);

  if (!courses) {
    return <p className="text-gray-500 text-sm">Loading courses...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">My Courses</h2>

      <div className="border rounded overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Students</th>
              <th className="px-4 py-2">Published</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-12 h-8 object-cover rounded"
                    />
                    <span>{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-2">
                    {currency}
                    {course.coursePrice}
                  </td>
                  <td className="px-4 py-2">{course.enrolledStudents?.length || 0}</td>
                  <td className="px-4 py-2">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                  No courses created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCourses;