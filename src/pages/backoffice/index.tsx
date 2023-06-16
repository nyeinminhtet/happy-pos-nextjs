import Layout from "@/Components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  return (
    <Layout title="Backoffice">
      <h1>backoffice</h1>
    </Layout>
  );
};
export default App;
