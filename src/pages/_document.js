import { Html,Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html className="overflow-hidden" lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased font-Inter">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
