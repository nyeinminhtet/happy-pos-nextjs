import { useAppSelector } from "@/store/hooks";
import Orders from "./orders";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/components/Loading";

const App = () => {
  const { isLoading } = useAppSelector(appData);

  if (isLoading) return <Loading />;

  return <Orders />;
};
export default App;
