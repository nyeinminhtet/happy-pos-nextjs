import { OrderContent } from "@/Contents/OrderContext";
import { Box, Typography, Avatar, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addons as Addon } from "@prisma/client";
import { CartItem } from "@/Types/Types";
import { config } from "@/config/config";
import { getCartTotalPrice } from "@/utils";

const Review = () => {
  const { ...data } = useContext(OrderContent);
  const { isloading, updateData, fetchData, cart } = useContext(OrderContent);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (!isloading && !cart.length) {
      const query = router.query;
      const isValid = query.locationId;
      isValid && router.push({ pathname: "/order", query });
    }
  }, [cart, isloading, router]);

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((addon) => {
      return (
        <Box
          key={addon.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{addon.name}</Typography>
          <Typography>{addon.price}</Typography>
        </Box>
      );
    });
  };

  //remove orderline
  const removeCartItems = (cartItem: CartItem) => {
    const remainingOrderlines = cart.filter(
      (item) => item.menu.id !== cartItem.menu.id
    );
    updateData({ ...data, cart: remainingOrderlines });
  };

  //comform order
  const conformOrder = async () => {
    const { locationId, tableId } = query;
    const isValid = locationId && tableId && cart.length;
    if (!isValid) return alert("Something is Wrong!");

    const data = await fetch(
      `${config.apiOrderBaseUrl}?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      }
    );
    const response = await data.json();
    const order = response.order;
    fetchData();
    router.push({ pathname: `/order/activeCart/${order.id}`, query });
  };
  if (!cart.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "500px" },
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          Review your order
        </Typography>
        {cart.map((cartItem, index) => {
          const { menu, addons, quantity } = cartItem;
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    mr: 1,
                    backgroundColor: "grey",
                  }}
                >
                  {quantity}x
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{menu.name}</Typography>
                  <Typography>{menu.price}</Typography>
                </Box>
              </Box>
              <Box sx={{ pl: 6 }}>{addons && renderAddons(addons)}</Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 3,
                  mt: 1,
                }}
              >
                <DeleteIcon
                  sx={{ mr: 2, cursor: "pointer" }}
                  onClick={() => removeCartItems(cartItem)}
                />
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push({
                      pathname: `menuUpdate/${cartItem.id}`,
                      query: router.query,
                    })
                  }
                />
              </Box>
            </Box>
          );
        })}
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="h4">Total: {getCartTotalPrice(cart)}</Typography>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="contained" onClick={conformOrder}>
            Confirm order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
