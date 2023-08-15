import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { emptyCart } from "@/store/slices/cartSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cooking from "@/assets/cooking.gif";
import Image from "next/image";
import { OrderStatus, orderlines as Orderline, orders } from "@prisma/client";
import { Card, CardContent, Typography } from "@mui/joy";

const ActiveOrder = () => {
  const router = useRouter();
  const { query } = router;
  const orderId = query.id as string;
  const dispatch = useAppDispatch();
  const { orders, menus, addons, orderlines } = useAppSelector(appData);
  const order = orders.find((item) => item.id === Number(orderId)) as orders;

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order, query, router]);

  useEffect(() => {
    dispatch(emptyCart());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
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
        <Card variant="soft" sx={{ minWidth: { xs: 100, sm: 200, md: 300 } }}>
          <CardContent>
            <Typography level="title-lg">
              Thank for ordering,
              <br />
              your order is start cooking...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ActiveOrder;
