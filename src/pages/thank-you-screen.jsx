import { DataContext } from "@/context/DataContext";
import { Download, Share2 } from "lucide-react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const ThankYouScreen = () => {
  const { pdfData } = useContext(DataContext);
  const router = useRouter()
  const fileUrl = pdfData.pdfUrl
  const fileName=pdfData.title
  console.log(pdfData,"pdfData");
  const [shared, setShared] = useState(false);
  const [error, setError] = useState('');

  


  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
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
  
  if (Array.isArray(pdfData) && pdfData.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: "url('/images/cream-bg.png')",
        paddingTop: "42%",
        // percent is wrt to this divs width not height
      }}
      className="fixed inset-0 h-svh bg-no-repeat bg-cover pb-9 flex  flex-col box px-5 gap-y-[19%]"
    >
      <div className="flex flex-col justify-between flex-1">
        <h1 className={`
          transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          text-[2.5rem] leading-tight font-bold text-left text-dark-brown`}>
          Thank You for
          <br />
          taking the
          <br />
          quiz
        </h1>

        <Image
          className={`
          self-end transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          priority={true}
          src={"/images/open book.png"}
          width={222}
          height={203}
          alt="open book image"
        />
      </div>

      <div className={`flex justify-between w-full gap-x-3 self-end 
          transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"}
        `}>
        {/* Download Button */}
        <button 
        onClick={handleDownload}
        className=" text-xs  leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none">
          <Download size={20} />
          <span className=" whitespace-nowrap">Download Report</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="text-xs leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none"
        >
          <Share2 size={20} />
          <span className=" whitespace-nowrap">Share Report</span>
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;
