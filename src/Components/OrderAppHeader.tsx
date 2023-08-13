import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import OrderAppHeaderImg from "../assets/orderwave.svg";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

interface Props {
  cartItemCount: number;
}

const OrderAppHeader = ({ cartItemCount }: Props) => {
  const router = useRouter();
  const { query } = router;
  const isHome = router.pathname === "/order";
  const isCart = router.pathname === "/order/cart";
  const isActiveOrder = router.pathname.includes("/order/activeOrder");
  const showCartIcon = !isCart && !isActiveOrder;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#00235B",
        }}
      >
        <Box>
          <Box
            sx={{
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => router.push({ pathname: "/order", query })}
          >
            <Typography
              variant="h4"
              className=" text-sm font-semibold md:text-2xl"
            >
              SarrMal
            </Typography>
          </Box>
        </Box>
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
                fontSize: { xs: "30px", sm: "40px" },
                color: "#FFE194",
              }}
            />
            {cartItemCount > 0 && (
              <Typography
                sx={{
                  color: "#E8F6EF",
                  borderRadius: "50%",
                  bgcolor: "red",
                  fontFamily: "monospace",
                  py: 0,
                  position: "absolute",
                  top: -10,
                  right: 0,
                }}
              >
                {cartItemCount}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(OrderAppHeader);
