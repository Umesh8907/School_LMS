"use client";
import React, { useState } from "react";

const Course_Module = () => {
  const [moduleCompleted, setModuleCompleted] = useState(0);
  const [chapterCompleted, setChapterCompleted] = useState(4);
  return (
    <div className="p-8 bg-[#F5F0F9] rounded-xl flex flex-col gap-6 h-full border  justify-center md:mt-0 mt-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-9  rounded-md bg-[#c4b7d9] flex items-center  justify-center text-[22px] font-semibold">{moduleCompleted}</div>
        <p className="text-sm">Module completed</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-9  rounded-md bg-[#ed99bb] flex items-center  justify-center text-[22px] font-semibold">{chapterCompleted}</div>
        <p className="text-sm">Chapters completed</p>
      </div>
    </div>
  );
};

export default Course_Module;
