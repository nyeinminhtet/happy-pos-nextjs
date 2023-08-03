import { ReactNode } from "react";
import Link from "next/link";
import { Paper, Typography } from "@mui/material";

interface Props {
  icon: ReactNode;
  title: string;
  subTitle?: string;
  href: string;
}

const ItemCart = ({ icon, title, subTitle, href }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
        <Paper
          elevation={2}
          sx={{
            width: { xs: 100, sm: 140, md: 170 },
            height: { xs: 100, sm: 140, md: 170 },
            mr: 4,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pl: 2,
            pb: 2,
          }}
        >
          {icon}

          <Typography
            sx={{
              color: "#4C4C6D",
              fontWeight: "700",
              fontSize: 20,
              textTransform: "capitalize",
              mt: 2,
            }}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              sx={{
                color: "#4C4C6D",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              {subTitle}
            </Typography>
          )}
        </Paper>
      </Link>
    );
  }
  return (
    <Paper
      elevation={2}
      sx={{
        width: 170,
        height: 170,
        mr: 4,
        mb: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pl: 2,
        pb: 2,
      }}
    >
      {icon}

      <Typography
        sx={{
          color: "#4C4C6D",
          fontWeight: "700",
          fontSize: 20,
          textTransform: "capitalize",
        }}
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography
          sx={{
            color: "#4C4C6D",
            fontWeight: "700",
            fontSize: 15,
          }}
        >
          {subTitle}
        </Typography>
      )}
    </Paper>
  );
};

export default ItemCart;
