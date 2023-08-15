import { useAppSelector } from "@/store/hooks";
import Orders from "./orders";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";
import Head from "next/head";

const App = () => {
  const { isLoading } = useAppSelector(appData);

  if (isLoading) return;
  <>
    <Head>Backoffice</Head>
    <Loading />
  </>;

  return <Orders />;
};
export default App;
