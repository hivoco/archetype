import "@/styles/globals.css";
import { DataProvider } from "@/context/DataContext";
import { ResultProvider } from "@/context/ResultContext";
import { ArchetypeContext, ArchetypeProvider } from "@/context/ArchetypeContext";
import { useContext } from "react";

export default function App({ Component, pageProps }) {  
  
  return (
    <DataProvider>
      <ResultProvider>
        <ArchetypeProvider>
          <Component {...pageProps} />
        </ArchetypeProvider>
      </ResultProvider>
    </DataProvider>
  );
}
