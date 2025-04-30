import LinkButton from "@/components/common/LinkButton";
import { ArchetypeContext } from "@/context/ArchetypeContext";
import { DataContext } from "@/context/DataContext";
import { ResultContext } from "@/context/ResultContext";
import { ArrowRight, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function Signup() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { result, setResult } = useContext(ResultContext);
  const { pdfData, setPdfData } = useContext(DataContext);
  const { ArchetypeData, setArchetypeData } = useContext(ArchetypeContext);
    
  const router =useRouter()
  console.log(ArchetypeData,"ArchetypeData");
  
  console.log(email,name);
  
  
  
  useEffect(() => {
    if (ArchetypeData.length === 0) {
      router.push("/quiz");
    }
    setStartAnimation(true);
  }, []);

  async function sendData( ) {
    if (!name || !email) return;

    const url = "https://backend.hivoco.com/user/save-user-data";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "quiz": result,
          "result": ArchetypeData,
          "pdfUrl": pdfData?.pdfUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();      
      router.push("thank-you-screen");

    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (ArchetypeData.length === 0) {
    return null;
  }
  return (
    <div className="flex justify-center items-center h-svh bg-dark-brown py-10">
      <div className=" text-white px-8 h-full flex flex-col gap-y-10">
        <section className="flex flex-col gap-y-9">
          <Link href={"know-more"}>
            <MoveLeft size={20} />
          </Link>

          <div className="flex flex-col items-center">
            <Image
              className={`transition-all duration-1000 ease-in-out
               ${startAnimation ? "scale-100 opacity-100" : "scale-0 opacity-0"}
              `}
              src="/images/quiz.png"
              priority={true}
              width={140}
              height={144}
              alt="Picture of icon"
            />

            <h2
              className={`
              transition-all duration-1000 ease-in-out
            ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }
              text-xl font-bold  text-center tracking-wide`}
            >
              To Get Your Report
            </h2>
          </div>
        </section>

        <form  className="flex flex-col flex-1 justify-between">
          <div
            className={`
            transition-all duration-1000 ease-in-out
            ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }
            `}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              // autoComplete="name"
              // doesnt work in mobile simulation in chrome
              required
              minLength="2"
              maxLength={15}
              placeholder="Name"
              className="w-full text-base text-white text-left bg-transparent p-3 mb-5 rounded-md border border-off-white outline-none  placeholder:text-white autofill:!bg-transparent
              [&:-webkit-autofill]:bg-transparent
              [&:-webkit-autofill:hover]:bg-transparent
              [&:-webkit-autofill:focus]:bg-transparent
              [&:-webkit-autofill:active]:bg-transparent
              [&:-webkit-autofill]:[transition-delay:9999s]
              [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]              
              "
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // pattern=".+@example\.com"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Id"
              required
              className="w-full text-base text-white text-left bg-transparent p-3  rounded-md border border-off-white outline-none placeholder:text-white
              [&:-webkit-autofill]:bg-transparent
              [&:-webkit-autofill:hover]:bg-transparent
              [&:-webkit-autofill:focus]:bg-transparent
              [&:-webkit-autofill:active]:bg-transparent
              [&:-webkit-autofill]:[transition-delay:9999s]
              [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]
              "
            />
          </div>

          <button
          type="button"
            // href={"thank-you-screen"}
            onClick={sendData}
            className={`
              transition-all duration-1000 ease-in-out
              ${
                startAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[200%] opacity-0"
              }
              flex w-full items-center justify-center px-2 py-3 gap-2 bg-[#FFF3E140] rounded-[40px] text-white font-semibold text-sm`}
          >
            <span>SUBMIT</span>
            <ArrowRight size={20} />
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
