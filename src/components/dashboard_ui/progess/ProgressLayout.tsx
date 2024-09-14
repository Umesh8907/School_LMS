import React from "react";
import Course_Progress from "./Course_Progress";
import Module_Progress from "./Module_Progress";
import Assesment_Progress from "./Assesment_Progress";
import Course_Module from "./Course_Module";

const ProgressLayout = () => {
  return (
    <div className="border-[1px] rounded-xl border-gray-300 p-4 md:p-8 w-full md:w-[75%]">
      <Course_Progress />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Module Progress */}
        <div className="w-full md:w-[70%]">
          <Module_Progress />
        </div>

        {/* Assessment Progress and Course Module */}
        <div className="flex flex-col gap-6 w-full md:w-[30%]">
          <div className="w-full h-full">
            <Assesment_Progress />
          </div>
          <div className="w-full h-full">
            <Course_Module />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressLayout;
