import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getLocationId } from "@/utils";
import { useEffect } from "react";
import { fetchAppData } from "@/store/slices/appSlice";
import { Session } from "next-auth";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const getLocation = getLocationId() as string;

  useEffect(() => {
    store.dispatch(fetchAppData(getLocation));
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
