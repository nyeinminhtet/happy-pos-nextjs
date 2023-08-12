import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "@/Components/BackofficeLayout";
import { getLocationId, getQuantityByOrderId } from "@/utils";
import {
  orders as Order,
  orderlines as OrderLine,
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  OrderStatus,
} from "@prisma/client";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateOrderlineStatus } from "@/store/slices/orderlinesSlice";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";

interface Props {
  menus: Menu[];
  addons: Addon[];
  addonCateogries: AddonCategory[];
  order: Order;
  orderlines: OrderLine[];
}
const Row = ({ order, orderlines, menus, addons, addonCateogries }: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const renderMenusAndAddonForOrder = () => {
    const orderlineItemsIds = orderlines.map((item) => item.cart_id);
    const cartIds: string[] = [];
    orderlineItemsIds.forEach((item) => {
      const hasAdded = cartIds.includes(item);
      if (!hasAdded) cartIds.push(item);
    });
    const orderlineMenus = cartIds.map((cartId) => {
      const orderlineAddonIds = orderlines
        .filter((item) => item.cart_id === cartId)
        .map((item) => item.addons_id);

      //addons
      const orderlineAddons = addons.filter((item) =>
        orderlineAddonIds.includes(item.id)
      );

      //menus
      const orderlineItems = orderlines.find(
        (item) => item.cart_id === cartId
      ) as OrderLine;
      const orderlineMenus = menus.find(
        (item) => item.id === orderlineItems.menus_id
      ) as Menu;

      //status
      const status = orderlines.find((item) => item.cart_id === cartId)?.status;

      //quantity
      const quantity = orderlines.find(
        (item) => item.cart_id === cartId
      )?.quantity;

      //find respective addon's category
      const addonsWithCategory: { [key: number]: Addon[] } = {};
      orderlineAddons.forEach((item) => {
        const addonCategory = addonCateogries.find(
          (addoncategory) => addoncategory.id === item.addon_category_id
        ) as AddonCategory;
        if (!addonsWithCategory[addonCategory.id]) {
          addonsWithCategory[addonCategory.id] = [item];
        } else {
          addonsWithCategory[addonCategory.id] = [
            ...addonsWithCategory[addonCategory.id],
            item,
          ];
        }
      });
      return {
        menu: orderlineMenus,
        addonsWithCategory,
        status,
        quantity,
        cartId,
      };
    });

    //update orderline status
    const handleUpdateOrderStatus = async (
      cartId: string,
      evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">
    ) => {
      dispatch(
        updateOrderlineStatus({
          cartId,
          status: evt.target.value as OrderStatus,
        })
      );
      toast.success("Order Status has been changed!");
    };

    return orderlineMenus.map((item, index) => (
      <Box key={index} sx={{ mr: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: { sm: 150, md: 200 },
            height: { sm: 230, md: 300 },
            p: 2,
            my: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { sm: "15px", md: "20px" } }}
                >
                  {item.menu.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#4E6C50",
                    borderRadius: "50%",
                    width: { sm: 20, md: 30 },
                    height: { sm: 20, md: 30 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: { sm: "14px", md: "18px" },
                  }}
                >
                  {item.quantity}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  maxHeight: { sm: "130px", md: "180px" },
                  overflowY: "scroll",
                }}
              >
                {Object.keys(item.addonsWithCategory).map((addonCategoryId) => {
                  const addonCategory = addonCateogries.find(
                    (item) => item.id === Number(addonCategoryId)
                  ) as AddonCategory;
                  const addons = item.addonsWithCategory[
                    Number(addonCategoryId)
                  ] as Addon[];
                  return (
                    <Box sx={{ mb: 1 }} key={addonCategoryId}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: { sm: "12px", md: "15px" },
                        }}
                      >
                        {addonCategory.name}
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        {addons.map((item) => {
                          return (
                            <Box key={item.id}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontSize: { sm: "12px", md: "14px" } }}
                              >
                                - {item.name}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={item.status}
                    sx={{
                      width: { sm: 120, md: 150 },
                      fontSize: { sm: "10px", md: "15px" },
                    }}
                    label="Status"
                    onChange={(evt) =>
                      handleUpdateOrderStatus(item.cartId, evt)
                    }
                  >
                    <MenuItem
                      sx={{ fontSize: { sm: "10px", md: "15px" } }}
                      value={OrderStatus.PENDING}
                    >
                      {OrderStatus.PENDING}
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "10px", md: "15px" } }}
                      value={OrderStatus.PREPARING}
                    >
                      {OrderStatus.PREPARING}
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "10px", md: "15px" } }}
                      value={OrderStatus.COMPLETE}
                    >
                      {OrderStatus.COMPLETE}
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "10px", md: "15px" } }}
                      value={OrderStatus.REJECTED}
                    >
                      {OrderStatus.REJECTED}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    ));
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }} component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {getQuantityByOrderId(orderlines, order.id)}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{order.table_id}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {order.is_paid ? "Yes" : "No"}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {renderMenusAndAddonForOrder()}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

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
