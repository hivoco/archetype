import "@/styles/globals.css";
import { DataProvider } from "@/context/DataContext";
import { ResultProvider } from "@/context/ResultContext";
import {
  ArchetypeContext,
  ArchetypeProvider,
} from "@/context/ArchetypeContext";
import { useContext } from "react";
import { QuizDataProvider } from "@/context/QuizDataContext";
import Head from "next/head";
// import { GoogleAnalytics } from "@next/third-parties/google";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://ofexassessments.com/" />

        <meta
          property="og:title"
          content="Discover Your Career Archetype – Take the Free Quiz"
        />

        <meta
          property="og:description"
          content="Uncover your unique career personality with our quick quiz. Understand what motivates you at work and how to make better career choices."
        />

        <meta
          name="description"
          content="Legends Face Off is coming to India! Play this game, answer fun questions about FC Barcelona and Real Madrid, and win a chance to meet the players!"
        />

        <meta
          name="keywords"
          content="career quiz, career archetype, personality quiz, career personality test, work motivation, career choices, free career test, discover career path, career assessment, job personality quiz"
        />

        <meta property="og:image" content="/images/logo_only.png" />
        <link rel="icon" href="" />

        <title>of Experience </title>
      </Head>

      <QuizDataProvider>
        <DataProvider>
          <ResultProvider>
            <ArchetypeProvider>
              <Component {...pageProps} />
            </ArchetypeProvider>
          </ResultProvider>
        </DataProvider>
      </QuizDataProvider>

      {/* <GoogleAnalytics gaId="" /> */}
    </>
  );
}
