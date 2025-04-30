import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX, Reply, RefreshCcw } from "lucide-react";
// import LinkButton from "./LinkButton";

const InstagramStoryPlayer = ({
  setAnimationNumber,
  videoSrc='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  // videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4",
  onReply, // Optional callback for reply action
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const resetVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setProgress(0);
      setIsVideoEnded(false);
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const updateProgress = () => {
      if (video.duration && isPlaying) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);

        // Check if video has ended
        if (progressPercent >= 100) {
          setIsVideoEnded(true);
          setIsPlaying(false);
        }
      }
    };

    // Set up progress tracking interval
    progressIntervalRef.current = setInterval(updateProgress, 100);

    // Autoplay and pause logic
    if (isPlaying && !isVideoEnded) {
      video.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }

    // Handle video end event as a fallback
    const handleVideoEnd = () => {
      setIsVideoEnded(true);
      setIsPlaying(false);
      // setAnimationNumber((prev) => prev + 1);
    };
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      // Clean up interval when component unmounts or deps change
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [isPlaying, videoSrc, isVideoEnded]);

  

  const togglePlayPause = () => {
    if (isVideoEnded) return; // Prevent play if video has ended
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply();
    }
  };

  useEffect(() => {
    if (isVideoEnded) {
      setAnimationNumber((prev) => prev + 1);
    }
  }, [isVideoEnded]);

  return (
    <div className="relative h-svh w-full ">
      {/* Progress Bar */}
      <div className="absolute top-2 left-0 right-0 z-10 px-2">
        <div className="h-2 bg-[#8D8D8D]/50 rounded-3xl overflow-hidden">
          <div
            className="h-full bg-cream rounded-3xl"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          ></div>
        </div>
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        playsInline
        // onEnded={()=>{setAnimationNumber((prev) => prev + 1)}}
        muted={isMuted}
      />

      {/* Central Play/Pause Overlay */}
      {!isVideoEnded && (
        <div
          onClick={togglePlayPause}
          className="absolute inset-0 z-20 flex items-center justify-center "
        >
          {!isPlaying && (
            <div className="bg-black/50 p-4 rounded-full">
              <Play color="white" size={40} />
            </div>
          )}
        </div>
      )}

      {/* Video Ended Overlay */}
      {isVideoEnded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 space-x-4 w-full">
          <button
            onClick={resetVideo}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center space-x-2"
          >
            <RefreshCcw color="white" size={24} />
            <span>Replay</span>
          </button>

          {onReply && (
            <button
              onClick={handleReply}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center space-x-2"
            >
              <Reply color="white" size={24} />
              <span>Replay</span>
            </button>
          )}
        </div>
      )}

      {/* Mute Button on Right */}
      <div className="absolute bottom-5 z-30 px-5 flex justify-between items-center w-full gap-x-3 ">
        {/* <span
          className="w-full "
          onClick={() => setAnimationNumber((prev) => prev + 1)}
        >
          <LinkButton
            href={""}
            title={"Skip"}
            className={"h-12 gap-x-2 w-full !bg-black/45"}
            skip={true}
          />
        </span> */}

        <button onClick={toggleMute} className="bg-black/50 p-3 rounded-full">
          {isMuted ? <VolumeX color="white" /> : <Volume2 color="white" />}
        </button>
      </div>

    </div>
  );
};

export default InstagramStoryPlayer;
