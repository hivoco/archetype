import LinkButton from "@/components/common/LinkButton";
import SmoothCardCarousel from "@/components/common/SmoothCardCarousel";
import { useEffect, useState } from "react";

const Archetype = () => {
  const [isLoaded,setIsLoaded]=useState(false)

  useEffect(()=>{
    setTimeout(() => {
      setIsLoaded(true);
    }, 0);
  },[])

  return (
    <div
      className={`bg-cream fixed inset-0 h-svh w-full flex flex-col gap-y-9 pt-14
      transition-transform duration-1000 ease-in-out
      ${isLoaded ? "translate-x-0" : "translate-x-full"} 

    `}
    >
      <h1 className="text-black  text-5xl font-bold  tracking-[0.01em] text-left px-5 ">
        Career
        <br />
        Archetype
      </h1>

      <div className="relative w-full flex-1 min-h-[80%]  overflow-hidden flex items-center justify-center gap-x-4 px-5">
        <SmoothCardCarousel reverse={false} scrollDirection="up" />
        <SmoothCardCarousel scrollDirection="down" reverse={false} />
        <SmoothCardCarousel reverse={true} scrollDirection="up" />

        <div className="absolute inset-0 bg-cream/40 z-10"></div>
        {/* takes the whole div stacked above other elements since z 10 and can display anything */}
      </div>

      <LinkButton
        href={"/intro-video"}
        title={"START"}
        className={"uppercase absolute bottom-9 -translate-x-1/2 left-1/2 z-30"}
      />
    </div>
  );
};

export default Archetype;
