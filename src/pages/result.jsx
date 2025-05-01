import LinkButton from "@/components/common/LinkButton";
import { ArchetypeContext } from "@/context/ArchetypeContext";
import { DataContext } from "@/context/DataContext";
import { QuizDataContext } from "@/context/QuizDataContext";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Result = () => {
  const router = useRouter();
  const [animationCounter, setAnimationCounter] = useState(0);
  const { data } = router.query;
  // const object = data ? JSON.parse(decodeURIComponent(data)) : [];

  const { quizResult, setQuizResult } = useContext(QuizDataContext);


  
  // useEffect(() => {
  //   if (Array.isArray(quizResult) && quizResult.length === 0) {
  //     router.push("/");
  //   }
  // }, [quizResult,router]);
  

  const { pdfData, setPdfData } = useContext(DataContext);
  const { ArchetypeData, setArchetypeData } = useContext(ArchetypeContext);
  // console.log(object, "object");
  // console.log(quizResult, "quizResult");

  
  
  
  // useEffect(() => {
  //   console.log(ArchetypeData,"ArchetypeData");
  // }, [ArchetypeData]);

  useEffect(() => {
    if (Array.isArray(quizResult) && quizResult?.length === 0) {
      router.push("/quiz");
    } else {
      setPdfData(quizResult?.pdf);
      setArchetypeData(quizResult?.archedata);
    }
  }, [quizResult]);

  const firstAnimationClass =
    animationCounter >= 1 ? "opacity-100" : "opacity-0";

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationCounter((prev) => {
        if (prev >= 3) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  
  if (Array.isArray(quizResult) && quizResult.length === 0) {
    return null;
  }
  return (
    <div className="bg-off-white text-black h-svh px-6 w-full flex flex-col justify-evenly gap-y-3 overflow-hidden">
      <div className="flex flex-col gap-y-8  ">
        {/* mb-3 */}
        <div className="flex gap-x-2 items-center">
          <Link href={"/"}>
            <ArrowLeft size={24} />
          </Link>

          <span className="text-base font-medium text-left self-center">
            Your Career Archetype
          </span>
        </div>

        <h2
          className={`text-base font-bold text-left transition-opacity duration-1000 ${firstAnimationClass}`}
        >
          You are a blend of:
        </h2>
      </div>

      {/* for single archetype */}
      {quizResult?.archedata?.length === 1 && (
        <div className="flex flex-col rounded-3xl relative w-full  aspect-[1.25] flex- px2">
          {/* top part */}
          <div
            className={`relative z-10 w-full min-h-[16.25rem] flex items-center  justify-center px-4 `}
          >
            {!quizResult?.archedata[0].isLeft && (
              // for image in the right and this text to the left
              // text comes from the left
              <p
                className={`overflow-x-scroll h-[55%] max-w-[60%] self-end flex items-center whitespace-nowrap font-Edo text-center text-[2rem] leading-9 font-normal uppercase text-white
            transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
            `}
              >
                {quizResult?.archedata[0]?.title?.replace(/\bthe\b/g, "") ||
                  "explorer"}
              </p>
            )}

            <Image
              className={`h-full w-auto object-contain overflow-hidden 
            transition-transform duration-1000
            ${
              animationCounter >= 1
                ? "translate-x-0"
                : quizResult?.archedata[0].isLeft
                ? "-translate-x-52"
                : "translate-x-96"
            }
            `}
              width={117}
              height={255}
              src={
                quizResult?.archedata[0]?.image ||
                "https://s3-alpha-sig.figma.com/img/dd46/d539/0f89514a6f57d5aee2c9a3ed5827589b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wt5TIaj0bqclUNAcj-gggCiQxdkmE-SyB4ZSeXf7NCZA5uCYPb9gbD-hf57QLvQPDN4BqtM3hDzFfvStD2UeTFxkp4yngxDsi6MAnQ~-VHdOD7cwKiFKUNJbHKRKbzR2HmJONJj2hXot-K994MYQp6ZmAdOzmYATmC1RzHgftQc394a6qA4USBEJ2UUL2Pk9ZhxMdlcvNyeLfnZFZiBoHi-lgs6oLBvX-clxGDuCmMOLsQnjBI7PXaet5fhh~DgkoCaKbeSUy3S~6kwf8WwQ7Yl0dFrZ5~xmLtPOAylJHzpJKg-dJEY8ytueMSF67BMZHqmywTMePYXkvI8~zJVPBg__"
              }
              alt="archetype image"
              priority={true}
            />

            {quizResult[0]?.archedata.isLeft && (
              // for image in the left and this text to the right
              // text comes from the right
              <p
                className={`overflow-x-scroll h-[55%] max-w-[60%] self-end flex items-center whitespace-nowrap font-Edo text-center text-[2rem] leading-9 font-normal uppercase text-white
            transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "translate-x-96"}
            `}
              >
                {quizResult?.archedata[0]?.title?.replace(/\bthe\b/g, "") ||
                  "explorer"}
              </p>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-[55%] w-full z-[-10]  border-white">
              {/* Gradient background with rounded top corners */}
              <div
                style={{
                  backgroundColor: `${
                    quizResult?.archedata[0]?.color || "#B40C0B"
                  } `,
                }}
                className="absolute inset-0  rounded-t-3xl w-full"
              />
            </div>
          </div>

          {/* bottom part */}
          <div
            style={{
              backgroundColor: `${
                quizResult?.archedata[0]?.color || "#B40C0B"
              }`,
            }}
            className="flex rounded-b-3xl"
          >
            <p
              className={`w-full overflow-y-auto text-left bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-3 pb-5 
            transition-transform duration-1000
            ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
            >
              {quizResult?.description?.description ||
                `
              A unique combination, this allows you to have an informed and
              prepared approach your career, while keeping passion curiosity in
              the forefront 
              `}
            </p>
          </div>
        </div>
      )}

      {/* for double archetype */}
      {quizResult?.archedata?.length === 2 && (
        <div className="flex flex-col self-center flex-">
          <div className="relative flex- mb-[] w-full  flex flex-col gap-y- justify-center ">
            {/* top part grad box*/}
            <div className="flex relative z-10 w-full mx-auto min-h-[16.25rem]  aspect-[1.25] flex- px-2 ">
              {/* left side text and image */}
              <div
                className={`w-1/2 h-full flex flex1 transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
          `}
              >
                <p
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                  }}
                  className="overflow-y-scroll mb-2 whitespace-nowrap font-Edo h-[45%] self-end text-right text-xl leading-6 font-normal uppercase text-white"
                >
                  {quizResult?.archedata[0]?.title.replace(/\bthe\b/g, "") ||
                    "explorer"}
                </p>

                <Image
                  className="h-full w-full object-contain overflow-hidden flex-1"
                  width={117}
                  height={255}
                  src={quizResult?.archedata[0]?.image || ""}
                  alt="left archetype image"
                  priority={true}
                />
              </div>

              {/*Center waala logo */}
              <Image
                // className="absolute  self-center mt-28  left-1/2 -translate-x-1/2"
                className="self-center mt12 relative -bottom-[10%] flex-1"
                width={66}
                height={67}
                src={"/images/icons/blend-icon.png"}
                alt="blend icon"
              />

              {/* right side div and image */}
              <div
                className={`w-1/2 h-full flex flex1 transition-transform duration-1000 
                       ${
                         animationCounter >= 2
                           ? "translate-x-0"
                           : "translate-x-[120%]"
                       }
            `}
              >
                <Image
                  // className="h-full w-full object-contain overflow-hidden flex-1"
                  className="h-full w-full object-contain overflow-hidden flex-"
                  width={117}
                  height={255}
                  src={
                    quizResult?.archedata[1]?.image ||
                    "https://s3-alpha-sig.figma.com/img/cc67/3930/4a1cfbd86ee2a31801a50fe8f00ccd1d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuV0qNv5AtdCAUFj-kVyMkck5vFzI1NKOG4JpF7Es-SVC4Sjjh5BbYN5iLrGTjU~NWQc6p10VzlH9zB8fdrl7pgbUa-iTX4H~7Mmc88HrjKbdwIn-12IfV~Rex5y-m0QM~5kvu5IDca7R930R1PlvUQcZdgjb6biTThWYZcGYi9nAX8kHGQyld99-q1TFBV4Xy3KgrgQ5RoFF~3WCKqazy6DSXGGkip4ePyIE9mUW8kPJCkBF3IN9q-RtP8Q6DvgBSAv4Hrae2FU0L97SoPKt2xmKfnu4nIKeOC5O35dcZ2Ut9TE~ceG3vWynuUKsRNvc5-d~iVxhgWUpOdPtbn7wg__"
                  }
                  alt="right archetype image"
                  priority={true}
                />

                <p
                  style={{
                    writingMode: "vertical-rl",
                  }}
                  // className="overflow-y-scroll mb-2 whitespace-nowrap font-Edo h-[45%] self-end text-right text-xl leading-6 font-normal uppercase text-white"

                  className="overflow-y-scroll overflow-x-hidden  mb-2 whitespace-nowrap font-Edo  h-[45%] self-end text-left  font-normal uppercase text-white  text-xl leading-"
                >
                  {quizResult?.archedata[1]?.title.replace(/\bthe\b/g, "") ||
                    "explorer"}
                </p>
              </div>
            </div>

            {/* new gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%]">
              {/* Gradient background with rounded top corners */}
              <div
                style={{
                  background: `linear-gradient(90deg, ${
                    quizResult?.archedata[0]?.color || "#F0B30E"
                  } 0%, ${quizResult?.archedata[1]?.color || "#7F87DA"} 100%)`,
                }}
                className="absolute inset-0  rounded-t-3xl"
              />
            </div>
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, ${
                quizResult?.archedata[0]?.color || "#F0B30E"
              } 0%, ${quizResult?.archedata[1]?.color || "#7F87DA"} 100%)`,
            }}
            className="flex flex-1  rounded-b-3xl  h-full"
          >
            <p
              className={`w-full overflow-y-scroll bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-3 pb-5 
            transition-transform duration-1000
            ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
            >
              {quizResult?.description?.description}
              {/* A unique combination, this
              allows you to have an informed and prepared approach your career,
              while keeping passion curiosity in the forefront */}
            </p>
          </div>
        </div>
      )}

      {/* Footer section */}
      <div className=" bottom-9  left-0  w-full flex flex-col  gap-y-10">
        <h2
          className={`text-lg   font-bold text-left
          transition-opacity duration-1000
          ${animationCounter >= 3 ? "opacity-100" : "opacity-0"}
          `}
        >
          Where curiosity <br /> meets strategy, passion thrives.
        </h2>

        <LinkButton
          title={"NEXT"}
          href={"/signup"}
          className={`transition-transform duration-1000 h-[46px] w-full
                    ${
                      animationCounter >= 3
                        ? "translate-y-0"
                        : "translate-y-[280%]"
                    }
                    `}
        />
      </div>
    </div>
  );
};

export default Result;
