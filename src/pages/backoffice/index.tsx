import { useAppSelector } from "@/store/hooks";
import Orders from "./orders";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";

const App = () => {
  const { isLoading } = useAppSelector(appData);

  if (isLoading) return <Loading />;

  return <Orders />;
};
export default App;
