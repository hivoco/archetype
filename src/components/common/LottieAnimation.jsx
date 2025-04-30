import animation from "@/assets/animation.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });



const LottieAnimation = () => {
  return (
    <div className="flex  flex-col justify-center items-center w-full absolute z-50 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
      <Lottie
        className="h-64 w-auto -mt-20"
        animationData={animation.animation}
        loop={true}
      />

      <p className="font-bold text-base text-left text-white -mt-20">
        Processing Results
      </p>
    </div>
  );
};

export default LottieAnimation;
