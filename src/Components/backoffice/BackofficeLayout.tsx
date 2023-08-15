import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const BackofficeLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const { init } = useAppSelector((state) => state.app);

  const router = useRouter();
  const login = router.pathname === "/auth/signin";

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [init, dispatch]);

  return (
    <>
      <Head>
        <title>Sarr Mal | Backoffice</title>
      </Head>
      <Box sx={{ minHeight: "100vh", bgcolor: "#98DFD6", minWidth: "100%" }}>
        <TopBar />
        <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
          {data && <SideBar />}
          <Box
            sx={{
              p: { xs: 0, sm: 1, md: 3 },
              pt: { xs: 5, sm: 5 },
              width: login ? "100%" : { xs: "60%", sm: "70%", md: "100%" },
              height: "100%",
              ml: { xs: 2, sm: 0 },
            }}
          >
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BackofficeLayout;
