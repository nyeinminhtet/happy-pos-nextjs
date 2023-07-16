import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  const { isloading } = useAppSelector((state) => state.app);
  if (isloading) return null;
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

export default Layout;
