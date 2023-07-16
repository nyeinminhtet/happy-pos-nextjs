import { OrderContent } from "@/Contents/OrderContext";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const ViewCartBar = () => {
  const router = useRouter();
  const { cart } = useContext(OrderContent);
  const cartText = `You have ${cart.length} item in cart`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "lightblue",
          width: "100%",
          py: 2,
          cursor: "pointer",
        }}
      >
        <Box
          onClick={() =>
            router.push({ pathname: "/order/cart", query: router.query })
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShoppingCartCheckoutIcon sx={{ fontSize: "40px", color: "blue" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", color: "green" }}
          >
            {cartText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCartBar;
