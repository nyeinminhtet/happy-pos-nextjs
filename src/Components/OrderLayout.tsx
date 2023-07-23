import { useAppDispatch } from "@/store/hooks";
import { Box } from "@mui/material";

import { useRouter } from "next/router";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const { query, isReady } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReady) {
      dispatch(fetchAppData({ locationId: query.locationId as string }));
    }
  }, [isReady, dispatch, query.locationId]);

  if (!isReady) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>{props.children}</Box>
    </Box>
  );
};

export default OrderLayout;
