import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>FGA RUN 2024</title>
        <meta name="description" content="Run For FGA Activation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </>
  );
};

export default MyApp;
