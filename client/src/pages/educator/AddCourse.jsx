import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const { backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // Initialize Quill once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const addChapter = () => {
    const title = prompt("Enter chapter title:");
    if (!title) return;
    const newChapter = {
      chapterId: Date.now().toString(),
      chapterTitle: title,
      chapterOrder: chapters.length + 1,
      chapterContent: [],
      collapsed: false,
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId) => {
    setChapters(chapters.filter((c) => c.chapterId !== chapterId));
  };

  const toggleChapter = (chapterId) => {
    setChapters(
      chapters.map((c) =>
        c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c
      )
    );
  };

  const openAddLecture = (chapterId) => {
    setActiveChapterId(chapterId);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowLecturePopup(true);
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration) {
      toast.error("Lecture title and duration are required");
      return;
    }
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId !== activeChapterId) return chapter;
        const newLecture = {
          ...lectureDetails,
          lectureDuration: Number(lectureDetails.lectureDuration),
          lectureOrder: chapter.chapterContent.length + 1,
          lectureId: Date.now().toString(),
        };
        return {
          ...chapter,
          chapterContent: [...chapter.chapterContent, newLecture],
        };
      })
    );
    setShowLecturePopup(false);
  };

  const removeLecture = (chapterId, lectureId) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId !== chapterId) return chapter;
        return {
          ...chapter,
          chapterContent: chapter.chapterContent.filter(
            (l) => l.lectureId !== lectureId
          ),
        };
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a course thumbnail");
      return;
    }
    if (chapters.length === 0) {
      toast.error("Add at least one chapter");
      return;
    }

    try {
      setSubmitting(true);

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters.map(({ collapsed, ...rest }) => rest),
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-5">Add New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            className="w-full border rounded p-2 text-sm"
            placeholder="e.g. Complete React Developer Course"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Course Description</label>
          <div ref={editorRef} className="bg-white" style={{ minHeight: "150px" }} />
        </div>

        <div className="flex gap-6 flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">Course Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
              min="0"
              className="border rounded p-2 text-sm w-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
              className="border rounded p-2 text-sm w-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer border border-dashed rounded-lg p-3 w-fit hover:bg-gray-50 transition-colors"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Thumbnail preview"
                  className="w-14 h-14 object-cover rounded"
                />
              ) : (
                <img
                  src={assets.file_upload_icon}
                  alt=""
                  className="w-8 h-8 opacity-70"
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm text-blue-600 font-medium">
                  {image ? "Change thumbnail" : "Upload thumbnail"}
                </span>
                {image && (
                  <span className="text-xs text-gray-500 truncate max-w-[160px]">
                    {image.name}
                  </span>
                )}
              </div>
              <input
                type="file"
                id="thumbnailImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>

        {/* Chapters */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Course Content</label>
            <button
              type="button"
              onClick={addChapter}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Chapter
            </button>
          </div>

          {chapters.length === 0 && (
            <p className="text-sm text-gray-400">No chapters yet.</p>
          )}

          <div className="space-y-3">
            {chapters.map((chapter) => (
              <div key={chapter.chapterId} className="border rounded">
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
                  onClick={() => toggleChapter(chapter.chapterId)}
                >
                  <p className="text-sm font-medium">
                    {chapter.chapterOrder}. {chapter.chapterTitle}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChapter(chapter.chapterId);
                    }}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {!chapter.collapsed && (
                  <div className="px-3 py-2 space-y-1">
                    {chapter.chapterContent.map((lecture) => (
                      <div
                        key={lecture.lectureId}
                        className="flex items-center justify-between text-sm text-gray-600 py-1"
                      >
                        <span>
                          {lecture.lectureOrder}. {lecture.lectureTitle} —{" "}
                          {lecture.lectureDuration} min
                          {lecture.isPreviewFree ? " (Free preview)" : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeLecture(chapter.chapterId, lecture.lectureId)
                          }
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => openAddLecture(chapter.chapterId)}
                      className="text-xs text-blue-600 hover:underline mt-1"
                    >
                      + Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Course"}
        </button>
      </form>

      {/* Lecture popup */}
      {showLecturePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-5 w-full max-w-sm space-y-3">
            <h3 className="font-medium">Add Lecture</h3>

            <input
              type="text"
              placeholder="Lecture title"
              value={lectureDetails.lectureTitle}
              onChange={(e) =>
                setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={lectureDetails.lectureDuration}
              onChange={(e) =>
                setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            />
            <input
              type="text"
              placeholder="Lecture URL (YouTube link)"
              value={lectureDetails.lectureUrl}
              onChange={(e) =>
                setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    isPreviewFree: e.target.checked,
                  })
                }
              />
              Free preview
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLecturePopup(false)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addLecture}
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;