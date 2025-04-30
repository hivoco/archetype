import { createContext, useState } from "react";

export const ArchetypeContext = createContext();

export const ArchetypeProvider = ({ children }) => {
  const [ArchetypeData, setArchetypeData] = useState([]);
  return (
    <ArchetypeContext.Provider value={{ ArchetypeData, setArchetypeData }}>
      {children}
    </ArchetypeContext.Provider>
  );
};
