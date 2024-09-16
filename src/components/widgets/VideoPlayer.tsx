"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-xl w-full h-[500px]">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default VideoPlayer;
