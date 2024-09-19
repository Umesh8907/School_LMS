"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface CourseContextType {
  courseData: any;
  activeModule: any;
  activeChapter: any;
  setActiveModule: React.Dispatch<React.SetStateAction<any>>;
  setActiveChapter: React.Dispatch<React.SetStateAction<any>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courseData, setCourseData] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState<any>(null);

  useEffect(() => {
    const fetchCourseById = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('registrationData') || '{}');
      const purchasedCourseId = storedUserData?.offeredCourses?.[0]?.id; // Fetch the first purchased course or modify this logic as needed
      console.log(purchasedCourseId)
      if (!purchasedCourseId) {
        console.error("No course ID found in localStorage");
        return;
      }

      try {
        const response = await axios.get( `https://infanoapi.pocapi.in/api/Course/GetById/${purchasedCourseId}`);
        const course = response.data;  // Assuming response.data contains the full course data

        if (course?.payload) {
          setCourseData(course.payload); // Assuming course data is in a `payload` field
          setActiveModule(course.payload.modules[0]); // Set the first module as active
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseById();
  }, []);

  useEffect(() => {
    if (activeModule) {
      setActiveChapter(activeModule.chapters[0]); // Set the first chapter of the active module
    }
  }, [activeModule]);

  return (
    <CourseContext.Provider
      value={{
        courseData,
        activeModule,
        activeChapter,
        setActiveModule,
        setActiveChapter,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
