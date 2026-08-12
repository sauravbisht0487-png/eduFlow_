import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import YouTube from 'react-youtube'

// Extracts the YouTube video ID from a full YouTube URL
const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [openSection, setOpenSection] = useState({});
   const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [playerData, setPlayerData] = useState(null); // { videoId, lectureTitle }

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    calculateLectureDuration,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);

    if (findCourse) {
      setCourseData(findCourse);
    } else if (allCourses && allCourses.length > 0) {
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePreviewClick = (lecture) => {
    const videoId = getYoutubeId(lecture.lectureUrl);
    if (videoId) {
      setPlayerData({ videoId, lectureTitle: lecture.lectureTitle });
    }
  };

  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Course not found.</p>
      </div>
    );
  }

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);

  const discountedPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  const fullDescription = courseData.courseDescription || "";
  const isLongDescription = fullDescription.length > 200;
  const displayedDescription =
    showFullDescription || !isLongDescription
      ? fullDescription
      : fullDescription.slice(0, 200) + "...";

  return (
    <>
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 pt-20 pb-20 flex flex-col md:flex-row gap-10 relative">
      {/* Left column */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {courseData.courseTitle}
        </h1>

        <div className="text-gray-600 mt-3 leading-relaxed text-sm">
          <span dangerouslySetInnerHTML={{ __html: displayedDescription }} />
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2 mt-4">
          <p className="font-medium text-gray-700">{rating.toFixed(1)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            ({courseData.courseRatings?.length || 0}{" "}
            {courseData.courseRatings?.length === 1 ? "rating" : "ratings"})
          </p>
          <p className="text-gray-500 text-sm">
            {courseData.enrolledStudents?.length || 0}{" "}
            {courseData.enrolledStudents?.length === 1
              ? "student"
              : "students"}
          </p>
        </div>

        <p className="text-sm mt-2">
          Course by{" "}
          <span className="text-blue-600 underline">
            {courseData.educator?.name || "Unknown Educator"}
          </span>
        </p>

        {/* Course structure / chapters */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Course Structure
            </h2>
            <p className="text-sm text-gray-500">
              {courseData.courseContent?.length || 0} chapters •{" "}
              {calculateNoOfLectures(courseData)} lectures •{" "}
              {calculateCourseDuration(courseData)}
            </p>
          </div>

          <div className="border border-gray-300 rounded-md divide-y">
            {courseData.courseContent?.map((chapter, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-gray-50"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`transition-transform ${
                        openSection[index] ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                    <p className="font-medium text-sm text-gray-800">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {chapter.chapterContent?.length || 0} lectures •{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                {openSection[index] && (
                  <ul className="pl-10 pr-4 py-2 text-sm text-gray-600 space-y-2">
                    {chapter.chapterContent?.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span>{lecture.lectureTitle}</span>
                        <span className="flex items-center gap-3">
                          {lecture.isPreviewFree && (
                            <span
                              onClick={() => handlePreviewClick(lecture)}
                              className="text-blue-600 text-xs cursor-pointer hover:underline"
                            >
                              Preview
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {calculateLectureDuration(lecture)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column - pricing card */}
      <div className="w-full md:w-80 border border-gray-300 rounded-lg shadow-sm p-5 h-fit sticky top-24">
        {playerData ? (
          <div className="w-full aspect-video rounded-md overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${playerData.videoId}?autoplay=1`}
              title={playerData.lectureTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full rounded-md"
          />
        )}

        <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
          <span>🔥 5 days left at this price!</span>
        </div>

        <div className="flex items-baseline gap-3 mt-3">
          <p className="text-2xl font-semibold text-gray-800">
            {currency}
            {discountedPrice}
          </p>
          {courseData.discount > 0 && (
            <>
              <p className="text-gray-500 line-through text-sm">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-red-500 text-sm">
                {courseData.discount}% off
              </p>
            </>
          )}
        </div>

        <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition">
          {isAlreadyEnrolled ? 'Already Enrolled':'Enroll Now'}
        </button>

        <div className="mt-5 text-sm text-gray-600 space-y-2">
          <p>✔ {calculateCourseDuration(courseData)} on-demand video</p>
          <p>✔ Lifetime access with free update</p>
          <p>✔ Certificate of completion</p>
          <p>✔ {calculateNoOfLectures(courseData)} lectures</p>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default CourseDetails;