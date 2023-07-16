import { OrderContent } from "@/Contents/OrderContext";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const query = router.query;
  const orderId = query.id as string;
  const { orders, cart } = useContext(OrderContent);
  const order = orders.find((item) => item.id === Number(orderId));

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order]);

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
