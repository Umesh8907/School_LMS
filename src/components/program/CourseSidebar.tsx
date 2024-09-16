import { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlayCircle,
  FiCircle,
} from "react-icons/fi";
import { FaPlay } from "react-icons/fa6";

interface Point {
  id: number;
  description: string;
}

interface Chapter {
  id: number;
  name: string;
  points: Point[];
}

interface Module {
  id: number;
  name: string;
  chapters: Chapter[];
}

const Sidebar = () => {
  const modules: Module[] = [
    {
      id: 1,
      name: "Introduction to Women's Health",
      chapters: [
        {
          id: 1,
          name: "Introduction",
          points: [
            { id: 1, description: "Understanding you and your body" },
            {
              id: 2,
              description: "The concept of 'well-being' beyond physical health",
            },
            {
              id: 3,
              description: "Importance of prioritizing health in college life",
            },
          ],
        },
        {
          id: 2,
          name: "The Interconnectedness of Body and Mind",
          points: [
            { id: 1, description: "The concept of holistic health" },
            {
              id: 2,
              description: "Impact of physical health on mental well-being ",
            },
            {
              id: 3,
              description: "Influence of mental health on physical well-being",
            },
          ],
        },
        {
          id: 3,
          name: "Common Health Myths and Misconceptions",
          points: [
            { id: 1, description: "Point 1.1.1" },
            { id: 2, description: "Point 1.1.2" },
            { id: 3, description: "Point 1.1.3" },
          ],
        },
        {
          id: 4,
          name: "Building a Strong Foundation",
          points: [
            { id: 1, description: "Point 1.1.1" },
            { id: 2, description: "Point 1.1.2" },
            { id: 3, description: "Point 1.1.3" },
          ],
        },
        {
          id: 5,
          name: "The Transformative Phase of College Years",
          points: [
            { id: 1, description: "Point 1.1.1" },
            { id: 2, description: "Point 1.1.2" },
            { id: 3, description: "Point 1.1.3" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Module 2",
      chapters: [
        {
          id: 1,
          name: "Chapter 2.1",
          points: [
            { id: 1, description: "Point 2.1.1" },
            { id: 2, description: "Point 2.1.2" },
            { id: 3, description: "Point 2.1.3" },
          ],
        },
        { id: 2, name: "Chapter 2.2", points: [] },
        { id: 3, name: "Chapter 2.3", points: [] },
        { id: 4, name: "Chapter 2.4", points: [] },
        { id: 5, name: "Chapter 2.5", points: [] },
      ],
    },
    // Add more modules and chapters if necessary
  ];

  const [openModule, setOpenModule] = useState<number | null>(null);
  const [playingChapter, setPlayingChapter] = useState<{
    moduleId: number;
    chapterId: number;
  } | null>(null);
  const [openChapter, setOpenChapter] = useState<{
    moduleId: number;
    chapterId: number;
  } | null>(null);

  const toggleModule = (moduleId: number) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const handlePlayChapter = (moduleId: number, chapterId: number) => {
    setPlayingChapter({ moduleId, chapterId });
    setOpenChapter(
      openChapter?.chapterId === chapterId ? null : { moduleId, chapterId }
    );
  };

  // Calculate the progress of chapters completed
  const calculateProgress = (module: Module) => {
    const totalChapters = module.chapters.length;
    const completedChapters = module.chapters.filter(
      (chapter) =>
        playingChapter?.moduleId === module.id &&
        playingChapter?.chapterId === chapter.id
    ).length;
    return (completedChapters / totalChapters) * 100;
  };

  return (
    <div className="w-full bg-[#f4f2ff] p-4 h-screen">
      <h2 className="text-lg font-bold mb-4">Course Navigation</h2>
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <div key={module.id}>
            <button
              onClick={() => toggleModule(module.id)}
              className="flex justify-between items-center w-full text-left py-2 px-3 rounded-lg"
            >
              {/* Prefix with "Module - [Number]" */}
              <span>{`Module - ${moduleIndex + 1}: ${module.name}`}</span>
              {openModule === module.id ? (
                <FiChevronDown />
              ) : (
                <FiChevronRight />
              )}
            </button>

            {openModule === module.id && (
              <div className="mt-2 space-y-2 pl-4">
                {/* Progress bar for module */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${calculateProgress(module)}%` }}
                  ></div>
                </div>
                {module.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id}>
                    <div
                      onClick={() => handlePlayChapter(module.id, chapter.id)}
                      className={`text-sm py-1 px-2 rounded-lg cursor-pointer flex items-center space-x-2 ${
                        playingChapter?.moduleId === module.id &&
                        playingChapter?.chapterId === chapter.id
                          ? " animate-pulse"
                          : ""
                      }`}
                    >
                      {playingChapter?.moduleId === module.id &&
                        playingChapter?.chapterId === chapter.id && (
                          <FaPlay className="animate-pulse " />
                        )}
                      {/* Prefix with "Chapter - [Number]" */}
                      <span>{`Chapter - ${chapterIndex + 1}: ${
                        chapter.name
                      }`}</span>
                    </div>
                    {/* Display points for the active chapter */}
                    {openChapter?.moduleId === module.id &&
                      openChapter?.chapterId === chapter.id && (
                        <div className="pl-6 mt-2 space-y-1">
                          {chapter.points.length > 0 ? (
                            chapter.points.map((point) => (
                              <div
                                key={point.id}
                                className="flex items-center text-xs rounded-lg"
                              >
                                <li>{point.description}</li>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs py-1 px-2 rounded-lg">
                              No points available.
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
