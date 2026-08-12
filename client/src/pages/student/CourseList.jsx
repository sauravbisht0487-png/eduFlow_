import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import Footer from "../../components/student/Footer";

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 pt-20 pb-10">
      <div className="flex flex-col items-start w-full">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No courses found.
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseList;