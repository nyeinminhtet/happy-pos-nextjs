import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import { selectCart } from "@/store/slices/cartSlice";
import OrderAppHeader from "./OrderAppHeader";
import OrderHero from "./OrderHero";

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
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          top: isHome ? { xs: 55, sm: 60, md: 70 } : { xs: 50, sm: 90 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "90%" },
            grid: { xs: 2, sm: 4, md: 5 },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderLayout;
