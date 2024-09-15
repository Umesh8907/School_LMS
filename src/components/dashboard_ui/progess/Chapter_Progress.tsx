'use client'
import React, { useState } from "react";
import { Progress } from "../../ui/progress";

const dummyData = [
  {
    id: 1,
    name: "The Menstrual Cycle",
    duration: "30 minutes",
    status: "Completed",
  },
  {
    id: 2,
    name: "Understanding PMS",
    duration: "45 minutes",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Managing Menstrual Pain",
    duration: "20 minutes",
    status: "Not Started",
  },
  {
    id: 4,
    name: "Healthy Practices",
    duration: "35 minutes",
    status: "Completed",
  },
  {
    id: 5,
    name: "Menstrual Health Myths",
    duration: "40 minutes",
    status: "Completed",
  },
];

// Utility function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case "Completed":
      return "text-[#418e64] bg-[#b1dec8]";
    case "In Progress":
      return "text-[#3066c9] bg-[#b7d0f9]";
    case "Not Started":
      return "text-[#d84779] bg-[#f7d3e1]";
    default:
      return "";
  }
};

const Chapter_Progress: React.FC = () => {
  const [progress, setProgress] = useState(50);

  return (
    <div className="border rounded text-sm">
      {/* Header */}
      <div className="bg-[#f7f0f3] px-4 py-2 sm:px-6 sm:py-2 h-14">
        <div className="flex justify-between items-center h-full">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold">Current Module</h2>
            <p className="text-xs sm:text-sm">Duration: 2 Hours</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Progress
              value={progress}
              className="w-[160px] h-[15px] bg-white rounded-lg"
            />
            <p className="text-xs sm:text-sm">{`${progress}% Completed`}</p>
          </div>
        </div>
      </div>

      {/* Heading for both mobile and desktop */}
      <div className="grid grid-cols-[40px_2fr_1fr_1fr] gap-2 font-semibold p-3 border-b text-xs sm:text-sm">
        <div className="text-center">S.No</div>
        <div>Chapter Name</div>
        <div>Duration</div>
        <div className="text-left">Status</div>
      </div>

      {/* Data Rows */}
      <div>
        {dummyData.map((data, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_2fr_1fr_1fr] sm:grid-cols-[40px_2fr_1fr_1fr] gap-2 items-center py-2 px-3 border-b text-xs sm:text-sm"
          >
            {/* S.No */}
            <div className="text-center">{index + 1}</div>

            {/* Chapter Name */}
            <div>{data.name}</div>

            {/* Duration */}
            <div>{data.duration}</div>

            {/* Status with color based on condition */}
            <div
              className={`text-left px-2 py-1 rounded-sm ${getStatusColor(
                data.status
              )}`}
            >
              {data.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapter_Progress;
