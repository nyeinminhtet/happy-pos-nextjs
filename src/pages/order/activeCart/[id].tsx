import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { emptyCart, selectCart } from "@/store/slices/cartSlice";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cooking from "@/assets/cooking.gif";
import Image from "next/image";
import { OrderStatus, orderlines as Orderline, orders } from "@prisma/client";
import Loading from "@/Components/Loading";
import { config } from "@/config/config";

const ActiveOrder = () => {
  const router = useRouter();
  const { query } = router;
  const orderId = query.id as string;
  const dispatch = useAppDispatch();
  const { orders, menus, addons, orderlines } = useAppSelector(appData);
  const order = orders.find((item) => item.id === Number(orderId)) as orders;
  const { items } = useAppSelector(selectCart);

  console.log(orderId);
  let reCheck: Orderline[];
  let status: OrderStatus;

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order, query, router]);

  // useEffect(() => {
  //   dispatch(emptyCart());
  // }, []);

  // setInterval(async () => {
  //   const response = await fetch(`/api/orderlines?orderId=${orderId}`);
  //   const data = await response.json();

  // setTimeout(async () => {
  //   if (order) {
  //     const response = await fetch(
  //       `${config.apiBaseUrl}/orderlines?orderId=${order.id}`
  //     );
  //     const newdata = await response.json();
  //     console.log("newdata", newdata);
  //   }
  // }, 1000 * 60);
  //   console.log("data", data);
  //   reCheck = data;
  //   console.log("recheck", reCheck);
  //   if (reCheck.length) {
  //     status = reCheck.map((item) => item.status);
  //   }
  //   console.log(status);
  // }, 1000 * 20);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mt: -2,
        }}
      >
        <Image src={cooking} alt="cooking" width={250} />
      </Box>
      <Box className=" flex mt-3 flex-wrap justify-center">
        {items && order
          ? items.map((item) => (
              <Paper
                sx={{
                  width: 300,
                  mx: 3,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  mb: 3,
                }}
                key={item.id}
              >
                <Typography variant="h5">menu: {item.menu.name}</Typography>
                <Typography variant="h5">quantity: {item.quantity}</Typography>
                <Typography variant="h5">TotalPrice:{order.price}</Typography>
                <Typography>{status ? status[1] : "Pending"}</Typography>
                <Typography></Typography>
              </Paper>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default ActiveOrder;
