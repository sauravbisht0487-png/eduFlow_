import React, { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";

const StudentEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    // TODO: replace with real API call once backend is ready
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  if (!enrolledStudents) {
    return <p className="text-gray-500 text-sm">Loading students...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">Students Enrolled</h2>

      <div className="border rounded overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.length > 0 ? (
              enrolledStudents.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={item.student.imageUrl}
                      alt={item.student.name}
                      className="w-7 h-7 rounded-full"
                    />
                    {item.student.name}
                  </td>
                  <td className="px-4 py-2">{item.courseTitle}</td>
                  <td className="px-4 py-2">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-400">
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEnrolled;