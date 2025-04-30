import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [pdfData, setPdfData] = useState([]);
  return (
    <DataContext.Provider value={{ pdfData, setPdfData }}>
      {children}
    </DataContext.Provider>
  );
};
