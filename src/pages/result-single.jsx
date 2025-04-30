import LinkButton from "@/components/common/LinkButton";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Result = () => {
  const [animationCounter, setAnimationCounter] = useState(0);

  const router = useRouter();
  const { data } = router.query;
  const object = data ? JSON.parse(decodeURIComponent(data)) : [
          {
              "_id": "676a47f0b0d60d9e9bb3c755",
              "title": "the ruler",
              "image": "https://careerarchetypes.s3.ap-south-1.amazonaws.com/The_Ruler.png",
              "color": "#B40C0B",
              "isLeft":true
          }
      
  
  ];

  

  console.log(object.length);

  useEffect(() => {
    if (data?.length <= 0) {
      router.back();
    }
  }, [data?.length]);

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

  return (
    <div className="bg-off-white text-black h-svh px-6 w-full flex flex-col justify-evenly gap-y-3 overflow-hidden">
      {/* pt-10 pb-9 */}
      {/* gap-y-4 */}
      {/* border border-black  */}
      {/* header section */}

      {/* <div className="flex flex-col w-full h-full flex-1 justify-between"> */}
      <div className="flex flex-col gap-y-8  ">
        {/* mb-3 */}
        <div className="flex gap-x-2 items-center">
          <Link href={"/quiz"}>
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

      {/* single Archetype result */}
      {object.length === 1 && (
        <div className="flex flex-col rounded-3xl relative w-full  aspect-[1.25] flex- px2">
          {/* top part */}
          <div
            className={`relative z-10 w-full min-h-[16.25rem] flex items-center  justify-center px-4 `}
          >
            {!object[0].isLeft && (
              // for image in the right and this text to the left
              // text comes from the left
              <p
                className={`overflow-x-scroll h-[55%] max-w-[60%] self-end flex items-center whitespace-nowrap font-Edo text-center text-[2rem] leading-9 font-normal uppercase text-white
            transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
            `}
              >
                {object[0]?.title?.replace(/\bthe\b/g, "") || "explorer"}
              </p>
            )}

            <Image
              className={`h-full w-auto object-contain overflow-hidden 
            transition-transform duration-1000
            ${
              animationCounter >= 1
                ? "translate-x-0"
                : object[0].isLeft
                ? "-translate-x-52"
                : "translate-x-96"
            }
            `}
              width={117}
              height={255}
              src={
                object[0]?.image ||
                "https://s3-alpha-sig.figma.com/img/dd46/d539/0f89514a6f57d5aee2c9a3ed5827589b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wt5TIaj0bqclUNAcj-gggCiQxdkmE-SyB4ZSeXf7NCZA5uCYPb9gbD-hf57QLvQPDN4BqtM3hDzFfvStD2UeTFxkp4yngxDsi6MAnQ~-VHdOD7cwKiFKUNJbHKRKbzR2HmJONJj2hXot-K994MYQp6ZmAdOzmYATmC1RzHgftQc394a6qA4USBEJ2UUL2Pk9ZhxMdlcvNyeLfnZFZiBoHi-lgs6oLBvX-clxGDuCmMOLsQnjBI7PXaet5fhh~DgkoCaKbeSUy3S~6kwf8WwQ7Yl0dFrZ5~xmLtPOAylJHzpJKg-dJEY8ytueMSF67BMZHqmywTMePYXkvI8~zJVPBg__"
              }
              alt="archetype image"
              priority={true}
            />

            {object[0].isLeft && (
              // for image in the left and this text to the right
              // text comes from the right
              <p
                className={`overflow-x-scroll h-[55%] max-w-[60%] self-end flex items-center whitespace-nowrap font-Edo text-center text-[2rem] leading-9 font-normal uppercase text-white
            transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "translate-x-96"}
            `}
              >
                {object[0]?.title?.replace(/\bthe\b/g, "") || "explorer"}
              </p>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-[55%] w-full z-[-10]  border-white">
              {/* Gradient background with rounded top corners */}
              <div
                style={{
                  backgroundColor: `${object[0]?.color || "#B40C0B"} `,
                }}
                className="absolute inset-0  rounded-t-3xl w-full"
              />
            </div>
          </div>

          {/* bottom part */}
          <div
            style={{ backgroundColor: `${object[0]?.color || "#B40C0B"}` }}
            className="flex rounded-b-3xl"
          >
            <p
              className={`w-full text-left bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-3 pb-5 
            transition-transform duration-1000
            ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
            >
              A unique combination, this allows you to have an informed and
              prepared approach your career, while keeping passion curiosity in
              the forefront
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
          title={"Know More"}
          href={"/know-more"}
          className={`transition-transform duration-1000 h-[46px] w-full
          ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[280%]"}
        `}
        />
      </div>
    </div>
  );
};

export default Result;
