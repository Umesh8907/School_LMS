import React from "react";
import Course_Progress from "./Course_Progress";
import Module_Progress from "./Module_Progress";
import Assesment_Progress from "./Assesment_Progress";
import Course_Module from "./Course_Module";

const ProgressLayout = () => {
  return (
    <div className="md:border-[1px] rounded-xl border-gray-300 p-0 md:p-6 w-full md:w-[75%]">
      <Course_Progress />
      <div className="flex flex-col md:flex-row md:gap-4 md:mt-4">
        {/* Module Progress */}
        <div className="w-full md:w-[70%]">
          <Module_Progress />
        </div>

        {/* Assessment Progress and Course Module */}
        <div className="flex md:flex-col md:gap-6 gap-2  md:w-[30%] w-full mb-4">
          <div className="md:w-full w-1/2 ">
            <Assesment_Progress />
          </div>
          <div className="md:w-full w-1/2 ">
            <Course_Module />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressLayout;
