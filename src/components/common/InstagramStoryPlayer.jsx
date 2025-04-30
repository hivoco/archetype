import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX, Reply, RefreshCcw, SkipForward } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const InstagramStoryPlayer = ({
  href,
  showSkipBtn,
  videoSrc='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  onReply, // Optional callback for reply action
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const [isLoaded,setIsLoaded]=useState(false)


  const [displayBtns, setDisplayBtns] = useState(true);

  // useEffect(() => {
  //   let timeoutId = null;
  //   if (displayBtns) {
  //     timeoutId = setTimeout(() => {
  //       setDisplayBtns(false);
  //     }, 2 * 1000);

  //     return () => {
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }
  //     };
  //   }
  // }, [displayBtns]);


  useEffect(() => {
    let timeoutId=null
    if (displayBtns) {
      timeoutId = setTimeout(() => {
        setDisplayBtns(false);
      }, 4000);

      // Cleanup timer when effect runs again or component unmounts
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [displayBtns]); // Added isVisible to dependency array


  const resetVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setProgress(0);
      setIsVideoEnded(false);
      setIsPlaying(true);
    }
  };

  const router =useRouter()

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
      router.push(href);
    }
  }, [isVideoEnded]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div
      className={`fixed inset-0 h-svh w-full bg-black 
      transition-transform duration-1000 ease-in-out
      ${isLoaded ? "translate-x-0" : "translate-x-full"} 
      `}
    >
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
        className="w-full h-full object-contain"
        playsInline
        muted={isMuted}
      />

      {/* Central Play/Pause Overlayed */}
      {!isVideoEnded && (
        <div
          onClick={(e) => {
            togglePlayPause();
            console.log(e.target, e.currentTarget);

            e.target === e.currentTarget && setDisplayBtns(true);
          }}
          // onClick={togglePlayPause}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          {!isPlaying && (
            <div className="bg-black/50 p-4 rounded-full pointer-events-none">
              <Play color="white" size={40} />
            </div>
          )}
        </div>
      )}

      <div
        className={`absolute top-[10%] flex flex-col right-4 z-30 gap-y-2
        transition-opacity ease-in-out duration-1000
        ${
          displayBtns
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          // onClick={(e) => !displayBtns && e.stopPropagation()}
          href={displayBtns ? href : ""}
          className={`bg-black/50 w-full p-[10px] gap-1 rounded-full flex items-center text-white font-Inter text-base
            ${showSkipBtn ? "opacity-100" : "hidden"}  
            `}
        >
          Skip
          <SkipForward
            size={20}
            color="white"
          />
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!displayBtns) return;
            toggleMute();
          }}
          // onClick={toggleMute}
          className="bg-black/50 p-[10px] rounded-full self-end"
        >
          {isMuted ? <VolumeX color="white" /> : <Volume2 color="white" />}
        </button>
      </div>
    </div>
  );
};

export default InstagramStoryPlayer;
