import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@mui/material";
import { Session } from "next-auth";
import { theme } from "@/utils/theme";
import Layout from "@/Components/Layout";
import Head from "next/head";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  return (
    <>
      <Head>
        <title>Sarr Mal</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
