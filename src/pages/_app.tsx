import { AppPropsWithLayout } from "@/interface";
import { GlobalProvider } from "@/provider";
import "@/translate";
import "@/styles/globals.css";
import React from "react";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || React.Fragment;

  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}
