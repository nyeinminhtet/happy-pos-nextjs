import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import { selectCart } from "@/store/slices/cartSlice";
import OrderAppHeader from "./OrderAppHeader";
import Tables from "./Tables";
import Head from "next/head";

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
    <>
      <Head>
        <title>Sarr Mal | Order</title>
      </Head>
      <Box position="relative">
        <OrderAppHeader cartItemCount={items.length} />
        {!query.tableId ? (
          <Tables />
        ) : (
          <Box
            sx={{
              position: "relative",
              zIndex: 5,
              top: isHome ? { xs: 10, sm: 25, md: 30 } : { xs: 10 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                grid: { xs: 2, sm: 4, md: 5 },
              }}
            >
              {props.children}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderLayout;
