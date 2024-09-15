"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import expert1 from "../../assets/experts/1.png"; // Assuming this path is correct
import { Progress } from "../ui/progress";

interface Module {
  id: number;
  title: string;
  subtitle: string;
  progressStatus: number;
  imageUrl: StaticImageData;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Thrive and Rise",
    subtitle: "Physical Health and Well-being",
    progressStatus: 75,
    imageUrl: expert1,
  },
  {
    id: 2,
    title: "Mindful Living",
    subtitle: "Mental Clarity and Balance",
    progressStatus: 40,
    imageUrl: expert1,
  },
  {
    id: 3,
    title: "Healthy Habits",
    subtitle: "Nutrition and Lifestyle",
    progressStatus: 85,
    imageUrl: expert1,
  },
  {
    id: 4,
    title: "Stress Management",
    subtitle: "Coping Strategies and Techniques",
    progressStatus: 60,
    imageUrl: expert1,
  },
  {
    id: 5,
    title: "Holistic Wellness",
    subtitle: "Integrative Approaches to Health",
    progressStatus: 50,
    imageUrl: expert1,
  },
];

const ModuleCards: React.FC = () => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 min-w-max">
        {modules.map((module, index) => (
          <div key={module.id} className="p-4 shadow-lg rounded-xl border">
            <div className="flex gap-4 items-center">
              <Image
                src={module.imageUrl}
                alt={module.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{module.title}</h3>
                <p className="text-gray-600 text-sm">{module.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              {index === 0 ? (
                <>
                  <p className="text-sm font-semibold text-green-600">Live</p>
                  <Progress
                    value={module.progressStatus}
                    className="w-[150px] h-[15px] bg-white rounded-lg shadow-lg border"
                  />
                  <p className="text-sm font-semibold">{`${module.progressStatus} % Completed`}</p>
                </>
              ) : (
                <p className="text-sm font-semibold text-gray-500">
                  Yet to Begin
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
