"use client";

import { useCourse } from "@/context/CourseContext";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const { courseData, activeChapter } = useCourse();
  return (
    <div className="md:w-[96%] w-[95%] mx-auto mb-20">
      <div className="mt-10">
        <h1 className="md:text-[24px] font-bold">My Programs</h1>
        <p className="mt-2">Manage and access your enrolled live programs</p>
      </div>
    </div>
  );
};

export default page;  
