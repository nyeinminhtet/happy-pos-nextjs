import { Box } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const BackofficeLayout = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppData({ locationId: undefined }));
  }, []);

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
