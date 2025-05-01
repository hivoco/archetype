import { createContext, useState } from "react";

export const QuizDataContext = createContext();
export const QuizDataProvider = ({ children }) => {
  const [quizResult, setQuizResult] = useState([]);
  return (
    <QuizDataContext.Provider value={{ quizResult, setQuizResult }}>
      {children}
    </QuizDataContext.Provider>
  );
};
