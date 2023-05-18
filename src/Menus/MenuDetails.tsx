const MenuDetails = () => {
  return <h1>MenuDetails</h1>;
};

export default MenuDetails;
// import { useContext, useEffect, useState } from "react";
// import Layout from "../Components/Layout";
// import { MenuContent } from "../Contents/Menu_Contents";
// import { useParams } from "react-router-dom";
// import { Menu } from "../Types/Types";
// import { Autocomplete, Box, Button, TextField } from "@mui/material";
// import { config } from "../config/config";

// const MenuDetails = () => {
//   const { menus, menuCategories, ...data } = useContext(MenuContent);
//   const { menuId } = useParams();
//   let menu: Menu | undefined;
//   if (menuId) {
//     menu = menus.find((item) => item.id === parseInt(menuId, 10));
//   }
//   const [newMenu, setNewMenu] = useState({
//     name: "",
//     price: 0,
//   });

//   const mapMenuCategories = menuCategories.map((menuCategory) => ({
//     id: menuCategory.id,
//     label: menuCategory.category,
//   }));

//   useEffect(() => {
//     if (menu) setNewMenu({ name: menu?.name, price: menu?.price });
//   }, [menu]);

//   //update
//   const updateMenu = async () => {
//     const response = await fetch(`${config.apiBaseUrl}/menus/${menu?.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newMenu),
//     });
//   };

//   return (
//     <Layout title="MenuDetails">
//       {menu ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//           mt={5}
//         >
//           <TextField
//             sx={{ minWidth: "400px", mb: 4 }}
//             id="filled-basic"
//             label="Name"
//             variant="filled"
//             defaultValue={menu.name}
//             onChange={(evt) =>
//               setNewMenu({ ...newMenu, name: evt.target.value })
//             }
//           />
//           <TextField
//             sx={{ minWidth: "400px", mb: 3 }}
//             id="filled-basic"
//             label="Price"
//             defaultValue={menu.price}
//             type="number"
//             variant="filled"
//             onChange={(evt) =>
//               setNewMenu({ ...newMenu, price: parseInt(evt.target.value, 10) })
//             }
//           />
//           <Autocomplete
//             disablePortal
//             multiple
//             id="combo-box-demo"
//             options={mapMenuCategories}
//             sx={{ width: 300 }}
//             renderInput={(params) => (
//               <TextField {...params} label="Menu-Categories" />
//             )}
//           />
//           <Button variant="contained" onClick={updateMenu}>
//             UPDATE
//           </Button>
//         </Box>
//       ) : (
//         "menu not found"
//       )}
//     </Layout>
//   );
// };

// export default MenuDetails;
