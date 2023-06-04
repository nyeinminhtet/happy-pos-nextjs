import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { getLocationId } from "@/utils";
import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";

const Menus = () => {
  const { menus, fetchData, menuMenuCategoriesLocations } =
    useContext(BackofficeContext);
  const locationId = getLocationId();

  //loop for menuLocations
  const validMenuLocation =
    menuMenuCategoriesLocations &&
    menuMenuCategoriesLocations
      .filter((menulocation) => String(menulocation.location_id) === locationId)
      .map((menuId) => menuId.menu_id);

  const filterMenu = menus.filter((menu) =>
    validMenuLocation.includes(menu.id as number)
  );

  return (
    <Layout title="Menus">
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",

          m: "0 auto",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Link
            href={"/backoffice/menus/create"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                width: "250px",
                height: "250px",
                border: "2px dotted lightgray",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                userSelect: "none",
                background: "lightblue",
              }}
            >
              <AddIcon fontSize="large" />
              <Typography>Add new menu</Typography>
            </Box>
          </Link>
          {filterMenu.map((item) => (
            <Link
              key={item.id}
              href={`/backoffice/menus/${item.id}`}
              style={{
                textDecoration: "none",
                marginRight: "15px",
              }}
            >
              <Card sx={{ width: 300, m: "0 1rem", height: 300 }}>
                <CardMedia
                  sx={{ minHeight: 200 }}
                  image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.name}
                    <span style={{ color: "blue", fontSize: 18 }}>
                      {item.price}Kyat
                    </span>
                  </Typography>
                  <Typography sx={{ color: "gray" }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Menus;
