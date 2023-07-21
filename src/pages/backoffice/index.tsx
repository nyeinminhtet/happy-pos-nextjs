import Layout from "@/Components/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getLocationId } from "@/utils";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  return <Layout title="Backoffice">Backoffice for SarrMal</Layout>;
};
export default App;
