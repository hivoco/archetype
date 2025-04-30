import InstagramStoryPlayer from "@/components/common/InstagramStoryPlayer";

const IntroVideo = () => {
  return (
    <InstagramStoryPlayer
      videoSrc={"https://careerarchetypes.s3.ap-south-1.amazonaws.com/videos/Intro_Video.mp4"}
      href={"/quiz"}
      showSkipBtn={true}
    />
  );
};

export default IntroVideo;
