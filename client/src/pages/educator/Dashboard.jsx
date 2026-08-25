import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currency, backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <p className="text-gray-500 text-sm">Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">Dashboard</h2>

      {/* Stat cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="border rounded p-4 min-w-[160px]">
          <p className="text-sm text-gray-500">Total Enrollments</p>
          <p className="text-2xl font-semibold">
            {dashboardData.enrolledStudentsData?.length || 0}
          </p>
        </div>
        <div className="border rounded p-4 min-w-[160px]">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-semibold">{dashboardData.totalCourses || 0}</p>
        </div>
        <div className="border rounded p-4 min-w-[160px]">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-2xl font-semibold">
            {currency}
            {dashboardData.totalEarnings || 0}
          </p>
        </div>
      </div>

      {/* Latest enrollments */}
      <div>
        <h3 className="text-md font-medium mb-3">Latest Enrollments</h3>
        <div className="border rounded overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Course</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData?.length > 0 ? (
                dashboardData.enrolledStudentsData.map((item, index) => (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-4 text-center text-gray-400">
                    No enrollments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;