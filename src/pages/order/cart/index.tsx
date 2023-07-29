import { Box, Typography, Avatar, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addons as Addon } from "@prisma/client";
import { CartItem } from "@/Types/Types";
import { config } from "@/config/config";
import { getCartTotalPrice } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, selectCart } from "@/store/slices/cartSlice";
import { addOrder } from "@/store/slices/ordersSlice";
import { toast } from "react-toastify";

const Review = () => {
  const { items, isLoading } = useAppSelector(selectCart);
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !items.length) {
      const query = router.query;
      const isValid = query.locationId;
      isValid && router.push({ pathname: "/order", query });
    }
  }, [router, items, isLoading]);

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
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {addon.name}
          </Typography>
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {addon.price}
          </Typography>
        </Box>
      );
    });
  };

  //remove orderline
  const removeCartItems = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  //comform order
  const conformOrder = async () => {
    const { locationId, tableId } = query;
    const isValid = locationId && tableId && items.length;
    if (!isValid) return alert("Something is Wrong!");

    const data = await fetch(
      `${config.apiBaseUrl}/order?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }
    );
    const orderCreated = await data.json();
    dispatch(addOrder(orderCreated));
    router.push({
      pathname: `/order/activeCart/${orderCreated.id}`,
      query,
    });
    toast.success("Your order is start now!");
  };

  if (!items.length) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          bgcolor: "#98DFD6",
          borderRadius: 15,
          mx: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "500px" },
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Review your order
          </Typography>
          {items.map((cartItem, index) => {
            const { menu, addons, quantity } = cartItem;
            return (
              <Box key={index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      mr: 1,
                      backgroundColor: "#1B9C85",
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
                    <Typography variant="h6" color="black">
                      {menu.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {menu.price}
                    </Typography>
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
            <Typography variant="h4" color="primary">
              Total: {getCartTotalPrice(items)}
            </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" onClick={conformOrder}>
              Confirm order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
