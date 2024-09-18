"use client"; // Ensure this component is a client component

import { useCourse } from "@/context/CourseContext";

const VideoPlayer = () => {
  const { activeChapter } = useCourse();

  // Ensure that activeChapter and its video URL are defined
  const videoUrl = activeChapter?.resources?.[0]?.filePath;

  // YouTube embed URL format
  const embedUrl = videoUrl ? videoUrl.replace("watch?v=", "embed/") : "";

  return (
    <div className="w-full h-[500px] bg-black mb-4 relative">
      {videoUrl ? (
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
      
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Player"
        />
      ) : (
        <p className="text-white">No video available</p>
      )}
    </div>
  );
};

export default VideoPlayer;
