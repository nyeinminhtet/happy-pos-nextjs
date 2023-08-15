import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "@/Components/backoffice/BackofficeLayout";
import { getLocationId, getQuantityByOrderId } from "@/utils";
import {
  orders as Order,
  orderlines as OrderLine,
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
} from "@prisma/client";
import { Box } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";
import Row from "@/Components/backoffice/OrderRow";

const Orders = () => {
  const { orders, orderlines, menus, addonCategories, addons, isLoading } =
    useAppSelector(appData);
  const selectedLocation = getLocationId();
  const currentLocationOrder = orders.filter(
    (item) => item.location_id === Number(selectedLocation)
  );
  const getOrderlinesByOrderId = (orderId: number) => {
    return orderlines.filter((item) => item.order_id === orderId);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: { xs: 0, sm: 1 }, borderRight: 1 }} />
              <TableCell
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "15px" },
                  px: { xs: 0, sm: 1 },
                  textAlign: "center",
                  borderRight: 1,
                }}
              >
                Order-IDs
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "15px" },
                  px: { xs: 0, sm: 1 },
                  textAlign: "center",
                  borderRight: 1,
                }}
              >
                Quantity of Menus
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "15px" },
                  px: { xs: 0, sm: 1 },
                  textAlign: "center",
                  borderRight: 1,
                }}
              >
                Table-Ids
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "15px" },
                  px: { xs: 0, sm: 1 },
                  textAlign: "center",
                  borderRight: 1,
                }}
              >
                Paid
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "15px" },
                  px: { xs: 0, sm: 1 },
                  borderRight: 1,
                  textAlign: "center",
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLocationOrder.map((order, index) => (
              <Row
                key={index}
                order={order}
                orderlines={getOrderlinesByOrderId(order.id)}
                menus={menus}
                addons={addons}
                addonCateogries={addonCategories}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
