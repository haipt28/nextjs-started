import { AppPropsWithLayout } from "@/interface";
import { GlobalProvider } from "@/provider";
import "@/translate";
import "@/styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || React.Fragment;

  return (
    <SessionProvider session={pageProps.session}>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </SessionProvider>
  );
}
