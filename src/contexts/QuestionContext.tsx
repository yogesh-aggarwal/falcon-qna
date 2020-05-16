import React, { useState, createContext } from "react";

export const QuestionContext = createContext({});

export function QuestionContextProvider({ children }: any) {
  const [state, setQuestions] = useState({});
  return (
    <QuestionContext.Provider
      value={{ state: state, setQuestions: setQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
