import InstagramStoryPlayer from "@/components/common/InstagramStoryPlayer";

const KnowMore = () => {
  return (
    <div className="h-svh w-full">
      <InstagramStoryPlayer
        videoSrc={
          "https://careerarchetypes.s3.ap-south-1.amazonaws.com/videos/The_Artist.mp4"
        }
        href={"signup"}
        showSkipBtn={false}
      />
    </div>
  );
};

export default KnowMore;
