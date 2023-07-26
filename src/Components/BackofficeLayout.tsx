import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const BackofficeLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [init, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ p: 3, width: "100%" }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
