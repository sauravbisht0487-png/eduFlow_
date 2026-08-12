import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import LearningIllustration from "./LearningIllustration";

const Hero = () => {
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:px-12 lg:py-24 bg-white flex flex-col items-center text-center">
      <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 max-w-4xl">
        Empower your future with the course designed to{" "}
        <span className="text-blue-600">fit your choice</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="hidden lg:block absolute -bottom-8 right-0 lg:-right-16 w-40 lg:w-52 h-auto"
        />
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-gray-700">
        we bring together world-class instruction, interactive content, and a
        supportive community to help you achieve your personal and
        professional goals.
      </p>

      <div className="mt-10 w-full flex flex-col items-center gap-10">
        <LearningIllustration className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg mx-auto" />
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;