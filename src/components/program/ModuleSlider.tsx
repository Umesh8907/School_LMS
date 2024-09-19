"use client";

import React from "react";
import Image from "next/image";
import { useCourse } from "@/context/CourseContext"; // Use course context
import { Progress } from "../ui/progress"; // Assuming Progress is imported correctly

const ModuleCards: React.FC = () => {
  const { courseData, activeModule } = useCourse(); // Fetch course data and active module from context

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 min-w-max">
        {courseData?.modules?.map((module: any, index: any) => (
          <div
            key={module.id}
            className={`relative p-4 shadow-md bg-[#f4f2ff] rounded-xl border w-80 h-40 ${
              module.id !== activeModule?.id ? "grayscale opacity-50 pointer-events-none" : ""
            }`}
          >
            {/* "Live" label in the top-right corner for active module */}
            {module.id === activeModule?.id && (
              <div className="flex items-center gap-2 absolute top-2 right-2 text-sm font-semibold bg-green-600 text-white px-2 rounded">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="uppercase">Live</span>
              </div>
            )}
            <div className="flex gap-4 items-center">
              <Image
                src={module.imageUrl} // Assuming imageUrl is part of the fetched data
                alt={module.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{module.name}</h3>
                <p className="text-gray-600 text-sm">{module.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              {module.id === activeModule?.id ? (
                <>
                  <Progress
                    value={module.progressStatus}
                    className="w-[150px] h-[15px] bg-white rounded-lg shadow-lg border"
                  />
                  <p className="text-sm font-semibold">{`${module.progressStatus} % Completed`}</p>
                </>
              ) : (
                <p className="text-sm font-semibold text-gray-500">Yet to Begin</p>
              )}
            </div>
          </div>
        )) || <p className="text-gray-500">No modules available</p>}
      </div>
    </div>
  );
};

export default ModuleCards;
