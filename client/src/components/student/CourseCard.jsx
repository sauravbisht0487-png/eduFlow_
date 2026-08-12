import React from "react";
import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  const rating = calculateRating(course);
  const finalPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => window.scrollTo(0, 0)}
      className="group block"
    >
      <div className="relative flex flex-row items-stretch gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-3 sm:p-4 overflow-hidden">
        {/* hover glow accent */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

        {/* Thumbnail */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
          <img
            className="w-28 h-24 sm:w-32 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500"
            src={
              course.courseThumbnail?.trim()
                ? course.courseThumbnail
                : assets.placeholder
            }
            alt={course.courseTitle || "course thumbnail"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = assets.placeholder ?? assets.star;
            }}
          />
          {course.discount > 0 && (
            <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              {course.discount}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
          <div>
            <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {course.courseTitle}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {course.educator?.name}
            </p>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-sm font-bold text-amber-500">
              {rating.toFixed(1)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <img
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt="star"
                  key={i}
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              ({course.courseRatings.length})
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2.5">
            <p className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {currency}
              {finalPrice}
            </p>
            {course.discount > 0 && (
              <p className="text-xs text-gray-400 line-through">
                {currency}
                {course.coursePrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
