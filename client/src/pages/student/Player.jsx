import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronDown, PlayCircle, CheckCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import Rating from "../../components/student/Rating";

const Player = () => {

  const { courseId } = useParams();
  const { getToken } = useAuth();
  const {
    enrolledCourses,
    fetchUserEnrolledCourses,
    calculateChapterTime,
    backendUrl,
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);

  // Player can be opened directly (refresh / shared link), so it can't
  // assume enrolledCourses was already loaded by MyEnrollments — fetch it here too.
  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  // Find the course from enrolledCourses once it's loaded
  useEffect(() => {
    if (!Array.isArray(enrolledCourses)) return;

    if (enrolledCourses.length === 0) {
      // Still empty — could be mid-fetch, or genuinely no enrollments.
      // Either way stop showing "Loading" forever once fetch has had a chance to run.
      return;
    }

    const found = enrolledCourses.find((c) => c._id === courseId);
    setCourseData(found || null);
    setLoading(false);

    // Auto-open the first chapter and select the first lecture by default
    if (found && found.courseContent?.length > 0) {
      setOpenSections({ 0: true });
    }
  }, [enrolledCourses, courseId]);

  // Safety net: if enrolledCourses is still empty after a few seconds
  // (e.g. genuinely no enrollments, or the fetch failed), stop showing "Loading..."
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Extract a YouTube video ID from a full URL so it can be embedded
  const getYoutubeId = (url) => {
    if (!url) return "";
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&?/]+)/
    );
    return match ? match[1] : url;
  };

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading course...</p>
    );
  }

  if (!courseData) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Course not found, or you're not enrolled in it.
      </p>
    );
  }

  return (
    <>
    
    <div className="p-4 sm:p-10 md:px-36 grid md:grid-cols-2 gap-10">
      {/* Left column: chapters + lectures */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
        <div className="border rounded divide-y">
          {courseData.courseContent.map((chapter, index) => (
            <div key={index}>
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-gray-50"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-2">
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSections[index] ? "rotate-180" : ""
                    }`}
                  />
                  <p className="font-medium">{chapter.chapterTitle}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {chapter.chapterContent.length} lectures ·{" "}
                  {calculateChapterTime(chapter)}
                </span>
              </div>

              {openSections[index] && (
                <ul className="pl-4 pb-2">
                  {chapter.chapterContent.map((lecture, i) => {
                    const isCompleted =
                      progressData?.lectureCompleted.includes(
                        lecture.lectureId
                      );
                    const isActive =
                      playerData?.lectureId === lecture.lectureId;

                    return (
                      <li
                        key={i}
                        className={`flex items-center justify-between py-2 pr-4 text-sm ${
                          isActive ? "text-blue-600" : ""
                        }`}
                      >
                        <div
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            setPlayerData({
                              ...lecture,
                              chapter: index + 1,
                              lecture: i + 1,
                            })
                          }
                        >
                          {isCompleted ? (
                            <CheckCircle size={15} className="text-green-600 shrink-0" />
                          ) : (
                            <PlayCircle size={15} className="text-gray-400 shrink-0" />
                          )}
                          <span>{lecture.lectureTitle}</span>
                        </div>

                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <button
                            onClick={() =>
                              setPlayerData({
                                ...lecture,
                                chapter: index + 1,
                                lecture: i + 1,
                              })
                            }
                            className="text-blue-600 hover:underline"
                          >
                            Watch
                          </button>
                          <span className="text-gray-500">
                            {calculateChapterTime({
                              chapterContent: [lecture],
                            })}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Right column: video player */}
      <div>
        {playerData ? (
          <div>
            <iframe
              className="w-full aspect-video rounded"
              src={`https://www.youtube.com/embed/${getYoutubeId(
                playerData.lectureUrl
              )}`}
              title={playerData.lectureTitle}
              allowFullScreen
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-700">
                {playerData.chapter}.{playerData.lecture}{" "}
                {playerData.lectureTitle}
              </p>
              <button
                onClick={() => markLectureAsCompleted(playerData.lectureId)}
                className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
              >
                {progressData?.lectureCompleted.includes(playerData.lectureId)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>

          </div>
        ) : (
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full rounded"
          />
        )}
      </div>
      <Rating/>
    </div>
    
    </>
    
  );
};

export default Player;