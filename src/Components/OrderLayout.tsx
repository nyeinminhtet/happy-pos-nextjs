import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";

import { useRouter } from "next/router";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import { selectCart } from "@/store/slices/cartSlice";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const isHome = router.pathname === "/order";

  useEffect(() => {
    if (isReady) {
      dispatch(fetchAppData({ locationId: query.locationId as string }));
    }
  }, [isReady, dispatch, query.locationId]);

  if (!isReady) return null;

  return (
    <Box>
      <OrderAppHeader cartItemCount={items.length} />
      <Box sx={{ position: "relative", zIndex: 5, top: isHome ? 100 : 0 }}>
        <Box sx={{ width: { xs: "100%", md: "80%", lg: "55%" }, m: "0 auto" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderLayout;
