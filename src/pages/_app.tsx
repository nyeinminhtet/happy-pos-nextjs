import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import BackofficeProvider from "@/Contents/BackofficeContent";
import OrderProvider from "@/Contents/OrderContent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <BackofficeProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </BackofficeProvider>
    </SessionProvider>
  );
}
