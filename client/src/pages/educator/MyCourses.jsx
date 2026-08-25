import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const { currency, backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

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