import "../styles/globals.css";
import Head from "next/head";
import { AppWrapper } from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <title>Wasa</title>
        <meta name="description" content="Wasaaaaaaaa" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
