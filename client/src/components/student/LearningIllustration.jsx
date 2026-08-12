import React from "react";

/**
 * LearningIllustration
 * Flat-style SVG illustration: a boy and girl seated on the ground with a
 * laptop and books between them, surrounded by softly floating study icons
 * (lightbulb, graduation cap, book, sparkle). Pure SVG + CSS animation —
 * no image assets or extra dependencies.
 */
const LearningIllustration = ({ className = "" }) => {
  return (
    <div className={className}>
      <style>{`
        @keyframes li-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes li-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(6deg); }
        }
        @keyframes li-glow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .li-girl { animation: li-bob 4.2s ease-in-out infinite; transform-origin: bottom center; }
        .li-boy { animation: li-bob 4.6s ease-in-out infinite; animation-delay: 0.4s; transform-origin: bottom center; }
        .li-bulb { animation: li-float 5s ease-in-out infinite; transform-origin: center; }
        .li-cap { animation: li-float 6s ease-in-out infinite; animation-delay: 0.8s; transform-origin: center; }
        .li-book { animation: li-float 5.5s ease-in-out infinite; animation-delay: 1.2s; transform-origin: center; }
        .li-spark { animation: li-glow 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .li-girl, .li-boy, .li-bulb, .li-cap, .li-book, .li-spark { animation: none !important; }
        }
      `}</style>

      <svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Background blob */}
        <ellipse cx="300" cy="260" rx="260" ry="190" fill="#EAF3FF" />

        {/* Ground shadow */}
        <ellipse cx="300" cy="400" rx="190" ry="16" fill="#DCE6F0" />

        {/* Floating icons */}
        <g className="li-bulb">
          <circle cx="95" cy="110" r="26" fill="#FFF3D1" />
          <path d="M95 96a16 16 0 0 0-8 30v6h16v-6a16 16 0 0 0-8-30z" fill="#FFD166" />
          <rect x="89" y="132" width="12" height="5" rx="2" fill="#E8A93A" />
        </g>

        <g className="li-cap">
          <circle cx="500" cy="95" r="28" fill="#E7E9FF" />
          <path d="M500 82l-26 11 26 11 26-11z" fill="#4361EE" />
          <path d="M482 96v14c0 5 8 9 18 9s18-4 18-9V96" fill="none" stroke="#4361EE" strokeWidth="3" />
        </g>

        <g className="li-book">
          <circle cx="530" cy="230" r="24" fill="#FDE7EC" />
          <rect x="516" y="218" width="28" height="20" rx="2" fill="#EF476F" />
          <line x1="530" y1="218" x2="530" y2="238" stroke="#FDE7EC" strokeWidth="2" />
        </g>

        <g className="li-spark">
          <circle cx="70" cy="230" r="4" fill="#FFD166" />
        </g>
        <g className="li-spark" style={{ animationDelay: "1s" }}>
          <circle cx="130" cy="330" r="3" fill="#4361EE" />
        </g>
        <g className="li-spark" style={{ animationDelay: "0.5s" }}>
          <circle cx="470" cy="330" r="4" fill="#EF476F" />
        </g>

        {/* Laptop between them */}
        <g>
          <rect x="255" y="300" width="90" height="58" rx="6" fill="#E5E7EB" />
          <rect x="263" y="308" width="74" height="42" rx="3" fill="#1E293B" />
          <circle cx="300" cy="329" r="10" fill="none" stroke="#60A5FA" strokeWidth="2.5" opacity="0.9" />
          <path d="M296 329l4 4 8-8" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="248" y="358" width="104" height="8" rx="3" fill="#CBD5E1" />
        </g>

        {/* Girl (left) */}
        <g className="li-girl">
          {/* legs crossed */}
          <path d="M200 380c10-18 40-18 55 0" fill="none" stroke="#2D3142" strokeWidth="16" strokeLinecap="round" />
          {/* body */}
          <rect x="195" y="290" width="65" height="80" rx="20" fill="#FF8FA3" />
          {/* arm reaching to laptop */}
          <path d="M255 320c14 4 20 14 20 24" fill="none" stroke="#F4C9A8" strokeWidth="12" strokeLinecap="round" />
          {/* head */}
          <circle cx="227" cy="270" r="30" fill="#F4C9A8" />
          {/* hair bun + fringe */}
          <path d="M197 262a30 30 0 0 1 60 0c0 6-2 10-4 13-4-14-16-22-28-22s-24 8-28 22c-2-3-4-7-4-13z" fill="#3D2B1F" />
          <circle cx="227" cy="238" r="9" fill="#3D2B1F" />
        </g>

        {/* Boy (right) */}
        <g className="li-boy">
          <path d="M345 380c10-18 40-18 55 0" fill="none" stroke="#2D3142" strokeWidth="16" strokeLinecap="round" />
          <rect x="340" y="290" width="65" height="80" rx="20" fill="#4FC3A1" />
          <path d="M345 320c-14 4-20 14-20 24" fill="none" stroke="#E8B08A" strokeWidth="12" strokeLinecap="round" />
          <circle cx="373" cy="270" r="30" fill="#E8B08A" />
          {/* short hair */}
          <path d="M343 264a30 30 0 0 1 60 0c0 4-1 8-2 11-6-10-16-16-28-16s-22 6-28 16c-1-3-2-7-2-11z" fill="#1F1B16" />
        </g>
      </svg>
    </div>
  );
};

export default LearningIllustration;