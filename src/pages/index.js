import Image from "next/image";
import LinkButton from "@/components/common/LinkButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router =useRouter()
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationStarted(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      router.push("/archetype");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div
      style={{ backgroundImage: "url('/images/cream-bg.png')" }}
      className={`h-svh bg-no-repeat bg-cover flex flex-col items-center justify-center 
      ${isAnimationStarted ? "gap4" : ""}
      `}
    >
      <Image
        className={`transition-all duration-700 ease-in-out absolute top-20
        ${isAnimationStarted ? "translate-y-0 scale-[0.85]" : "translate-y-[300%] scale-100"}`}
        src={"/images/logo.png"}
        width={285} 
        height={97} 
        // 243:68
        priority={true}
        quality={100}
        alt="of experience logo"
      />

      <div
        className={`flex flex-col items-center transition-opacity duration-1000 ease-in-out
        ${isAnimationStarted ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex gap-4 flex-col items-center">
          <Image
            className=""
            src={"/images/bulb.png"}
            width={240}
            height={241}
            priority={true}
            alt="of experiences logo"
          />

          <p className="text-black  text-lg leading-6 font-semibold  text-center">
            Interpret your career with our <br /> Career Archetype Quiz
          </p>
        </div>

        {/* <LinkButton title={""} href={"/archetype"} className={"h-[46px] uppercase"} /> */}
      </div>
    </div>
  );
}
