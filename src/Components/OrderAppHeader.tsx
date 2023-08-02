import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import OrderAppHeaderImg from "../assets/orderwave.svg";

interface Props {
  cartItemCount: number;
}

const OrderAppHeader = ({ cartItemCount }: Props) => {
  const router = useRouter();
  const isHome = router.pathname === "/order";
  const isCart = router.pathname === "/order/cart";
  const isActiveOrder = router.pathname.includes("/order/activeOrder");
  const showCartIcon = !isCart && !isActiveOrder;

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        zIndex: 5,
      }}
    >
      {showCartIcon && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: { xs: 40, md: 80, lg: 200 },
            cursor: "pointer",
          }}
          onClick={() =>
            router.push({ pathname: "/order/cart", query: router.query })
          }
        >
          <ShoppingCartCheckoutIcon
            sx={{
              fontSize: "40px",
              color: "#FFE194",
            }}
          />
          {cartItemCount > 0 && (
            <Typography
              sx={{
                textAlign: "right",
                color: "#E8F6EF",
                position: "absolute",
                top: -10,
                right: 2,
                borderRadius: "50%",
                bgcolor: "red",
                fontSize: 17,
              }}
            >
              {cartItemCount}
            </Typography>
          )}
        </Box>
      )}

      <Image
        src={OrderAppHeaderImg}
        height={250}
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          objectFit: "cover",
        }}
        alt="header-image"
      />
      {isHome && (
        <Box>
          <Box
            sx={{
              position: "absolute",
              left: 30,
              top: 10,
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "white",
                fontSize: { xs: "24px", sm: "30px" },
              }}
            >
              Sarr Mall
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "lightGray", fontSize: { xs: "10px", sm: "13px" } }}
            >
              ChanmyaTharzi, Mandalay
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(OrderAppHeader);
