import QuizComponent from "@/components/common/QuizComponent";
import React, { useState, useMemo, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import { useRouter } from "next/router";
import { ResultContext } from "@/context/ResultContext";
import { QuizDataContext } from "@/context/QuizDataContext";

const CardSwiper = ({ step, setStep, setIsLoading }) => {
  const { quizResult, setQuizResult } = useContext(QuizDataContext);

  const [questions, setQuestions] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [result, setResult] = useState([]);
  const { result, setResult } = useContext(ResultContext);
  // console.log(result,'res');
  
  

  const [currentIndex, setCurrentIndex] = useState(11);
  const [error, setError] = useState(null);
  const router = useRouter();

  
  const fetchData = async () => {
    const url = "https://backend.hivoco.com/quiz/questions";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setQuestions(result);
      setIsLoaded(true)
    } catch (error) {
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  async function postData(data) {
    const url="https://backend.hivoco.com/quiz/calculate-result"
    try {
      setIsLoading(true);
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setQuizResult(result);
      // setIsLoading(false);
      router.push("/result")

      // result &&
      //   router.push({
      //     pathname: "/result",
      //     query: { data: encodeURIComponent(JSON.stringify(result)) },
      //   });

      // console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (result.length === 11) {
      postData(result);
    }
  }, [result]);

  const childRefs = useMemo(
    () =>
      Array(11)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  // Unified swipe logic
  const triggerSwipe = async (direction, index) => {
    const currentCard = childRefs[index]?.current;
    if (currentCard) {
      await currentCard.swipe(direction); // Trigger animation
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, idx) => idx !== index)
      );
      setCurrentIndex((prev) => prev - 1); // Update current index
    }
  };

  // swipe left logic for both touch and click
  const handleOptionClick = (index) => {
    step !== 11 && triggerSwipe("left", index); // if eleven then its the last card
  };


  // console.log(questions,'ques')


//   <div
//   className={`fixed inset-0 h-svh w-full bg-black 
//      transition-transform duration-1000 ease-in-out
//     ${isLoaded ? "translate-x-0" : "translate-x-full"} 
//     `}
// >
  // fixed inset-0
  // transition-  delay-1000 ease-in-out
  // ${startAnimation ? "translate-y-0 " : "translate-y-full"}

  return (
    <div
      className={`
        w-full
        h-full 
        overflow-hidden
        transition-opacity 
        duration-1000
        ease-in-out
        ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
    >

      <div className="w-full h-full ">
        {/* this div  takes the rest of the page */}
        {questions?.map((question, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={`absolute w-full h-3/5 swipe overflow-hidden z-0`}
            swipeRequirementType="position"
            swipeThreshold={1000}
            key={index}
            onSwipe={() => {
              return false;
            }}
            // preventSwipe={["left", "right", "up", "down"]} // Prevent all user swipes
          >
            <div
              className="h-full w-full px-7 rounded-xl overflow-hidden "
            >
              <QuizComponent
                step={step}
                setStep={setStep}
                ques={question}
                onClick={() => handleOptionClick(index)}
                onTouchEnd={() => handleOptionClick(index)}
                result={result}
                setResult={setResult}
              />
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default CardSwiper;
