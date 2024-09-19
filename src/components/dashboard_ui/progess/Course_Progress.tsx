"use client";
import Image from "next/image";
import React from "react";
import course1_image from "../../../assets/Course1.jpg";
import { Progress } from "../../ui/progress";
import { useCourse } from "@/context/CourseContext";


const Course_Progress = () => {
  const [progress, setProgress] = React.useState(50);
  const { courseData } = useCourse();
  console.log("this is data",courseData)

// Function to convert duration (in minutes) to hours and minutes
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

  return (
    <div className="bg-[#f4f2ff]  p-4 shadow-md rounded-xl border">
      <div className="md:flex gap-4 items-center justify-between">
        <div className="md:flex gap-4">
          {/* <Image
            src={`https://infanoapi.pocapi.in/api/Image/Download?folder=images&fileName=No_Image_Available.jpg&uniqueFileName=${courseData.thumbnailUniqueName}&width=100&height=100`}
            alt={"girl"}
            className="md:w-28 rounded-xl object-cover "
            width={100}
            height={100}
          /> */}
           <div className="md:w-[60%] md:ml-2 md:mt-0 mt-4">
          <p className="text-sm md:text-[16px]">
           {/* <strong>{courseData.name}</strong> | <strong>Duration:</strong> {formatDuration(courseData.duration)} */}
          </p>
          <p className="mt-4 text-gray-500 text-[12px] md:text-left text-cente md:text-[16px]">
            Comprehensive guide on menstrual health, nutrition, and safety for
            girls
          </p>
        </div>
        </div>
       

         <div className="flex flex-col justify-center items-center gap-2 ">
         <Progress
            value={progress}
            className="w-[180px]  h-4 bg-white rounded-lg shadow-lg md:mt-0 mt-4"
          />
          <p className="text-sm font-semibold md:text-[16px]">{`${progress} % Completed`}</p>
         </div>
     
      </div>
    </div>
  );
};

export default Course_Progress;
