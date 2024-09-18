"use client";
import { useCourse } from "@/context/CourseContext";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
  const { courseData, setActiveModule, setActiveChapter } = useCourse();
  const [selectedChapter, setSelectedChapter] = useState(null); // Track selected chapter

  const handleChapterClick = (chapter: any) => {
    setSelectedChapter(chapter.id); // Update selected chapter
    setActiveChapter(chapter); // Set active chapter
  };

  return (
    <div className="p-4 bg-[#f4f2ff]">
      <ul className="space-y-4">
        {courseData?.modules?.map((module: any, index: any) => (
          <Disclosure key={module.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full rounded-lg">
                  <span className="text-lg text-left font-medium">
                    <span className="font-bold">{`Module ${index + 1}`}</span> -{" "}
                    <span className="font-normal">{module.name}</span>
                  </span>
                  {open ? (
                    <FaChevronUp className="w-2 h-2" />
                  ) : (
                    <FaChevronDown className="w-2 h-2" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 bg-gray-50 rounded-xl">
                  <ul className="space-y-1">
                    {module.chapters?.map((chapter: any, index: any) => (
                      <li
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter)}
                        className={`flex items-center space-x-2 p-2 rounded-lg  hover:bg-[#e9daff] cursor-pointer ${
                          selectedChapter === chapter.id
                            ? "bg-[#e9daff] " // Different background for selected chapter
                            : ""
                        }`
                      }
                      >
                        <MdOutlineOndemandVideo className="text-[#662DB5] w-6 h-6" />
                        <div
                          
                          className="text-sm font-semibold"
                        >
                          {`${chapter.name}`}
                        </div>
                      </li>
                    )) || (
                      <li className="text-gray-500">No chapters available</li>
                    )}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )) || <li className="text-gray-500">No modules available</li>}
      </ul>
    </div>
  );
};

export default Sidebar;
