"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Define the Course type
interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  duration: number;
  price: number;
  discountedPrice: number;
  isFreeCourse: boolean;
}

const CoursesPage: React.FC = () => {
  // Static data for courses
  const courses: Course[] = [
    {
      id: "1",
      name: "Girlhood: HerNext Foundation",
      description:
        "Comprehensive guide on menstrual health, nutrition, and safety for girls",
      thumbnail: "https://img.freepik.com/free-photo/girl-student-hand-hug-book_1150-4131.jpg?w=1060&t=st=1727695423~exp=1727696023~hmac=7816d1bebace8dacc600471fffd3183a5d9d483951f9b3cf8481d41c0c791ada",
      duration: 120,
      price: 1000,
      discountedPrice: 800,
      isFreeCourse: false,
    },
    {
      id: "2",
      name: "JavaScript Fundamentals",
      description:
        "Master the fundamentals of JavaScript, including ES6+ syntax.",
      thumbnail: "https://via.placeholder.com/100",
      duration: 180,
      price: 1500,
      discountedPrice: 1200,
      isFreeCourse: false,
    },
    {
      id: "3",
      name: "CSS for Beginners",
      description:
        "Learn how to style web pages using CSS and make them responsive.",
      thumbnail: "https://via.placeholder.com/100",
      duration: 90,
      price: 0,
      discountedPrice: 0,
      isFreeCourse: true,
    },
  ];
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="md:w-[96%] w-[95%] mx-auto mb-20">
      <div className="mt-10">
        <h1 className="md:text-[24px] font-bold">My Programs</h1>
        <p className="mt-2">
          Your enrolled programs: Track progress and access course materials
          here
        </p>
      </div>
      <div className=" flex gap-10">
        {courses.map((course) => (
          <div key={course.id} className="">
            <div className=" w-[400px] mx-auto ">
              {course ? (
                <Card className="bg-[#f4f2ff]">
                  <div className=" ">
                    <Image
                      src={course.thumbnail}
                      alt={course.thumbnail}
                      width={100}
                      height={100}
                      className="object-cover rounded-lg w-full h-64 "
                    />

                    <div className="p-4">
                      <h1 className="sm:text-[22px] font-bold">
                        {course.name}
                      </h1>
                      <p className="text-sm mt-2 line-clamp-4">
                        {course.description}
                      </p>
                      <Separator className=" bg-gray-400" />
                      <p>
                        <strong>Duration:</strong>{" "}
                        {formatDuration(course.duration)}
                      </p>

                      <Separator className=" bg-gray-400" />
                      <div className="flex justify-between">
                        <p>porgess</p>
                        <p>30%</p>
                      </div>
                      <Separator className=" bg-gray-400" />
                      <div className="flex justify-between">
                        <p>Assessment Score</p>
                        <p>Pending</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button>Start</Button>
                  </div>
                </Card>
              ) : (
                <p>No course data available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
