"use client";
import { Separator } from "@/components/ui/separator";
import { HiOutlineInformationCircle } from "react-icons/hi2";

import ModuleSlider from "@/components/program/ModuleSlider";
import expert from "../../../assets/experts/3.png";
import { FaArrowAltCircleLeft, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
// Import your video file

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import { TabsDemo } from "@/components/widgets/Tabs";

const page = () => {
  return (
    <div className="md:w-[96%] w-[95%] mx-auto mb-20">
      <div className="mt-10">
        <h1 className="md:text-[24px] font-bold">My Programs</h1>
        <p className="mt-2">Manage and access your enrolled live programs</p>
      </div>
      <ModuleSlider />
      <Separator />
      <div className="flex mt-4">
        <div className="w-[70%] p-6 border">
          {/* Player Section */}
          <div className="flex justify-between">
            <p>
              My Programs / Empowering School Girls / <strong>HerNext</strong>
            </p>
            <div className="relative inline-block">
              <Link
                href="#"
                className="bg-[#f5e5eb] px-8 py-2 rounded-lg inline-block"
              >
                <p>Assessment</p>
              </Link>
              <HiOutlineInformationCircle className="absolute top-0 right-0 text-lg transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-6 h-6" />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-xl">Introduction to Yoga and Gut Health</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={expert}
                  alt="Expert"
                  className="rounded-full w-8 h-8 object-cover"
                />
                <p>Anmol, Swar Yoga Expert</p>
              </div>
              <div className="flex items-center gap-4">
                <p>Session 1/5</p>
                <div className="flex gap-2">
                  <FaRegArrowAltCircleLeft className="text-[28px]" />
                  <FaArrowAltCircleRight className="text-[28px]" />
                </div>
              </div>
            </div>
            {/* Video Player Section */}
            <div className="mt-2 ">
              <video controls className="w-full h-auto rounded-xl">
                <source
                  src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex gap-4 justify-end">
              <button className="px-2 bg-[#b7d0f9] rounded-lg py-2 font-semibold">
                Previous Chapter
              </button>
              <button className="px-2 bg-[#b7d0f9] rounded-lg py-2 font-semibold">
                Next Chapter
              </button>
            </div>
          </div>
          <Separator className="mt-4"/>
          <div>
            <TabsDemo/>
          </div>
        </div>
        <div className="w-[30%]">{/* Module Section */}
          <div>
            <h2 className="text-lg font-bold">Module 1: Introduction</h2>
            <ul>
              <li>Introduction to Yoga</li>
              <li>Benefits of Yoga</li>
              <li>Types of Yoga</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default page;
