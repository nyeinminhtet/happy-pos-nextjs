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
  const { company } = useAppSelector(appData);
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
              fontSize: { xs: "30px", sm: "40px" },
              color: "#FFE194",
            }}
          />
          {cartItemCount > 0 && (
            <Typography
              sx={{
                color: "#E8F6EF",
                position: "absolute",
                top: -10,
                right: 3,
                borderRadius: "50%",
                bgcolor: "red",
                fontFamily: "monospace",
                py: 0,
              }}
            >
              {cartItemCount}
            </Typography>
          )}
        </Box>
      )}
      <div className=" w-full h-fit p-3 bg-blue-950 flex justify-between">
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
              {company?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "lightGray", fontSize: { xs: "10px", sm: "13px" } }}
            >
              {company?.address}
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default React.memo(OrderAppHeader);
