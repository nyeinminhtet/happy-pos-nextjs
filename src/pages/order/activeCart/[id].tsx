import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { emptyCart } from "@/store/slices/cartSlice";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cooking from "@/assets/cooking.gif";
import Image from "next/image";
import { orderlines, orders } from "@prisma/client";
import Loading from "@/Components/Loading";

// const ActiveOrder = () => {
//   const router = useRouter();
//   const { query } = router;
//   const orderId = query.id as string;
//   const dispatch = useAppDispatch();
//   const { orders, orderlines, menus, addons } = useAppSelector(appData);
//   const order = orders.find((item) => item.id === Number(orderId)) as orders;

//   // const orderline = orderlines.filter((item) => item.order_id === order.id);
//   // console.log(orderlines);

//   // const orderlineMenus = menus.find(
//   //   (menu) => menu.id === orderline?.menus_id
//   // )?.name;

//   // const orderlineAddons = addons.find(
//   //   (addon) => addon.id === orderline?.addons_id
//   // )?.name;

//   // useEffect(() => {
//   //   console.log(orderline);
//   // }, [orderline]);

//   useEffect(() => {
//     if (!order) {
//       router.push({ pathname: "/order", query });
//     }
//   }, [order, query, router]);

//   useEffect(() => {
//     dispatch(emptyCart());
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           mt: -2,
//         }}
//       >
//         <Image src={cooking} alt="cooking" width={250} />

//         <Paper sx={{ width: 500 }}>
//           <Typography variant="h5">orderId: {order.id}</Typography>
//           <Typography variant="h5">Total-Price: {order.price}</Typography>
//           <Typography variant="h5">table: {order.table_id}</Typography>
//           {/* <Typography>{orderline?.status}</Typography> */}
//         </Paper>
//       </Box>
//     </Box>
//   );
// };
const ActiveOrder = {};

export default ActiveOrder;
