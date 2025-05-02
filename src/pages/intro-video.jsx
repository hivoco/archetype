import InstagramStoryPlayer from "@/components/common/InstagramStoryPlayer";

const IntroVideo = () => {
  return (
    <div className="relative h-svh w-full">
      <InstagramStoryPlayer
        videoSrc={
          "/videos/video.mp4"
          // "https://careerarchetypes.s3.ap-south-1.amazonaws.com/videos/Intro_Video.mp4"
        }
        href={"/quiz"}
        showSkipBtn={true}
      />
      
     </div>
  );
};

export default IntroVideo;
