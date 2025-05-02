import LinkButton from "@/components/common/LinkButton";
import { ArchetypeContext } from "@/context/ArchetypeContext";
import { DataContext } from "@/context/DataContext";
import { ResultContext } from "@/context/ResultContext";
import { ArrowRight, Download, MoveLeft, Share2 } from "lucide-react";
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
  //  const { pdfData } = useContext(DataContext);
    const router = useRouter()
    const fileUrl = pdfData.pdfUrl
    const fileName=pdfData.title
    // console.log(pdfData,"pdfData");
    const [shared, setShared] = useState(false);
    const [error, setError] = useState('');
  
    
  
    useEffect(() => {
      if (ArchetypeData.length === 0) {
        router.push("/quiz");
      }

      if (Array.isArray(pdfData) && pdfData.length === 0) {
        router.push("/quiz");
      } else {
        setStartAnimation(true);
      }
    }, []);
  
  
    const handleShare = async () => {
      // Reset states
      setError('');
      setShared(false);
  
      try {
        // Check if Web Share API is supported
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], `${fileName}`, { type: 'application/pdf' });
  
        if (!navigator.share) {
          throw new Error('Web Share API not supported');
        }
        
        if (navigator.share) {
          await navigator.share({
            title: fileName,
            text: "Here is a PDF that you might find interesting.",
            url: fileUrl,
            files: [file],
          });
        }
        else{
          const shareUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = shareUrl;
          a.download = `${pdfTitle}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(shareUrl);
        }
  
        setShared(true);
        setTimeout(() => setShared(false), 2000); // Reset success state after 2s
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(''), 3000); // Clear error after 3s
      }
    };
  
    const handleDownload = async() => {
      // window.open(fileUrl, '_blank'); // Opens the PDF in a new tab
      try {
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = fileName;
        
        // Required for Firefox
        document.body.appendChild(link);
        
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
      } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download file. Please try again later.');
      } finally {
        // setIsLoading(false);
      }
  
    };
    
  // console.log(ArchetypeData,"ArchetypeData");
  // console.log(email,name);
    

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
    // return null;
  }
  return (
    <div className="flex justify-center items-center h-svh bg-dark-brown py-10">
      <div className=" text-white px-6 h-full flex flex-col gap-y-10">
        <section className="flex flex-col gap-y-9">
          <Link href={"/result"}>
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
              text-base leading-5 font-normal text-center `}
            >

              Please share your details if you’d like to receive this report in
              your email.
            </h2>
          </div>
        </section>

        <form className="flex flex-col flex-1 justify-between">
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
              className="w-full text-base text-white text-left bg-transparent p-3 mb-7  rounded-md border border-off-white outline-none placeholder:text-white
              [&:-webkit-autofill]:bg-transparent
              [&:-webkit-autofill:hover]:bg-transparent
              [&:-webkit-autofill:focus]:bg-transparent
              [&:-webkit-autofill:active]:bg-transparent
              [&:-webkit-autofill]:[transition-delay:9999s]
              [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]
              "
            />

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
              <span>Send Report</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        <div
          className={`flex justify-between w-full gap-x-3 self-end 
          transition-all duration-1000 ease-in-out
          ${
            startAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-36 opacity-0"
          }
        `}
        >
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="text-sm font-bold tracking-tight text-center bg-cream shadow-[0px_2px_2px_0px_#FFF3E129] w-1/2 text-dark-brown border-2 border-solid border-[#FFF3E166] px-2 py-3 rounded-3xl flex items-center justify-center gap-x-1  hover:bg-brown-700 focus:outline-none"
          >
            <Download size={20} />
            <span className=" whitespace-nowrap">Download Report</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="text-sm font-bold text-center w-1/2 text-cream  border-2 border-solid border-cream px-2 py-3 rounded-3xl flex items-center justify-center gap-x-1  hover:bg-brown-700 focus:outline-none"
          >
            <Share2 size={20} />
            <span className=" whitespace-nowrap">Share Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
