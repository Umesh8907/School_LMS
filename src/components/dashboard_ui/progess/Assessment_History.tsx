"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "../../ui/progress";

// Define the type for assessment data
interface Assessment {
  id: number;
  name: string;
  score: number;
  status: "Completed" | "Locked"; // You can restrict it to specific strings
}

// Sample assessment data
const assessmentData: Assessment[] = [
  {
    id: 1,
    name: "Menstrual Cycle Quiz",
    score: 7.4,
    status: "Completed",
  },
  {
    id: 2,
    name: "PMS Understanding Test",
    score: 0,
    status: "Locked",
  },
  {
    id: 3,
    name: "Pain Management Assessment",
    score: 0,
    status: "Locked",
  },
  {
    id: 4,
    name: "Healthy Practices Quiz",
    score: 0,
    status: "Locked",
  },
  {
    id: 5,
    name: "Menstrual Health Myth Test",
    score: 0,
    status: "Locked",
  },
];

// Utility function to get status color
const getStatusColor = (status: "Completed" | "Locked"): string => {
  switch (status) {
    case "Completed":
      return "text-[#418e64] bg-[#b1dec8]";
    case "Locked":
      return "text-[#d84779] bg-[#f7d3e1]";
    default:
      return "";
  }
};

const AssessmentHistory: React.FC = () => {
  const [totalScore, setTotalScore] = useState<string>("0");

  useEffect(() => {
    // Calculate total score
    const scoreSum = assessmentData.reduce((acc, data) => acc + data.score, 0);
    setTotalScore(scoreSum.toFixed(1)); // Fix to one decimal place
  }, []);

  return (
    <div className="border rounded">
      <div className="bg-[#f7f0f3] px-6 py-2 h-16">
        <div className="flex justify-between items-center h-full">
          <h2 className="text-xl font-semibold">Assessment Progress</h2>
          <p className="text-sm">{`Current Score: ${totalScore}`}</p>
        </div>
      </div>

      {/* Heading */}
      <div className="grid grid-cols-[50px_2fr_1fr_1fr] gap-4 font-semibold p-4 border-b">
        <div className="text-center">S.No</div>
        <div>Assessment Name</div>
        <div>Score</div>
        <div className="text-left">Status</div>
      </div>

      {/* Data Rows */}
      <div>
        {assessmentData.map((data, index) => (
          <div
            key={data.id}
            className="grid grid-cols-[50px_2fr_1fr_1fr] gap-4 items-center py-2 px-4 border-b"
          >
            <div className="text-center">{index + 1}</div>
            <div>{data.name}</div>
            <div>{data.score}</div>
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

export default AssessmentHistory;
