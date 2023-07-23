import { OrderContent } from "@/Contents/OrderContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { emptyCart } from "@/store/slices/cartSlice";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const { query } = router;
  const orderId = query.id as string;
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(appData);
  const order = orders.find((item) => item.id === Number(orderId));

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order, query, router]);

  useEffect(() => {
    dispatch(emptyCart());
  }, []);

  if (!order) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper sx={{ width: 500 }}>
        <Typography variant="h5">orderId: {order.id}</Typography>
        <Typography variant="h5">Total-Price: {order.price}</Typography>
        <Typography variant="h5">table: {order.table_id}</Typography>
      </Paper>
    </Box>
  );
};

export default ActiveOrder;
