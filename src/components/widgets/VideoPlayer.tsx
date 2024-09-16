"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track video loading state

  useEffect(() => {
    setIsClient(true);
  }, [3000]);

  const handleReady = () => {
    setIsLoading(true); // When video is ready, hide the skeleton
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-xl w-full h-[500px]">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 animate-pulse rounded-xl"></div>
      )}
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        className="absolute top-0 left-0"
        onReady={handleReady} // Trigger handleReady when the video is ready
      />
    </div>
  );
};

export default VideoPlayer;
