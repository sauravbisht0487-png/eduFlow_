import React from "react";
import { assets } from "../../assets/assets";

// Full-screen loading state used while course/dashboard data is being fetched.
// Signature element: eight "lecture" dots orbit a center play icon, lighting up
// in sequence — a nod to buffering video content rather than a generic spinner.
const Loading = () => {
  const dotCount = 8;

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-6 motion-reduce:[&_*]:!animate-none">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        {/* orbiting dots */}
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (360 / dotCount) * i;
          const delay = (i * 1.1) / dotCount;
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
              style={{
                "--angle": `${angle}deg`,
                marginTop: "-0.3125rem",
                marginLeft: "-0.3125rem",
                animation: "loading-pulse-dot 1.1s ease-in-out infinite",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* static ring track */}
        <div className="absolute inset-0 rounded-full border border-gray-100" />

        {/* center play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center animate-[loading-breathe_2.2s_ease-in-out_infinite]">
            <img
              src={assets.play_icon}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 ml-0.5"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 tracking-wide">
        Loading your course
        <span className="inline-flex ml-0.5">
          <span className="animate-[loading-dot_1.4s_ease-in-out_infinite]">.</span>
          <span className="animate-[loading-dot_1.4s_ease-in-out_0.2s_infinite]">.</span>
          <span className="animate-[loading-dot_1.4s_ease-in-out_0.4s_infinite]">.</span>
        </span>
      </p>

      <style>{`
        @keyframes loading-pulse-dot {
          0%, 100% { opacity: 0.15; transform: scale(0.85) rotate(var(--angle, 0deg)) translate(2.9rem) rotate(calc(-1 * var(--angle, 0deg))); }
          50% { opacity: 1; transform: scale(1) rotate(var(--angle, 0deg)) translate(2.9rem) rotate(calc(-1 * var(--angle, 0deg))); }
        }
        @keyframes loading-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes loading-dot {
          0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
