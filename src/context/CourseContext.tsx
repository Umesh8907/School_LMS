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
    const fetchData = async () => {
      const response = await axios.get(`/api/course`);
      setCourseData(response.data.payload);
      setActiveModule(response.data.payload.modules[0]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeModule) {
      setActiveChapter(activeModule.chapters[0]);
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
  if (!context)
    throw new Error("useCourse must be used within a CourseProvider");
  return context;
};
