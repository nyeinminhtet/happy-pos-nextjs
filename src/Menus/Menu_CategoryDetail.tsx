const MenuCat = () => {
  return <h1>menuCAte</h1>;
};
export default MenuCat;

// import { useContext, useEffect, useState } from "react";
// import Layout from "../Components/Layout";
// import { MenuContent } from "../Contents/Menu_Contents";
// import { MenuCategories } from "../Types/Types";
// import { useParams } from "react-router-dom";
// import { Box, Button, TextField } from "@mui/material";
// import { config } from "../config/config";

// const MenuCategoryDetail = () => {
//   const { menuCategories, ...data } = useContext(MenuContent);
//   const { id } = useParams();
//   let menuCategory: MenuCategories | undefined;
//   if (id) {
//     menuCategory = menuCategories.find((item) => item.id === parseInt(id, 10));
//   }
//   const [newCategory, setNewCategory] = useState({ category: "" });

//   useEffect(() => {
//     if (menuCategory) setNewCategory({ category: menuCategory.category });
//   }, [menuCategory]);

//   //update
//   const updateData = async () => {
//     const response = await fetch(`${config.apiBaseUrl}/menu_categories/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newCategory),
//     });
//   };

//   return (
//     <Layout>
//       {menuCategory ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//             maxWidth: 500,
//             margin: "0 auto",
//             mt: 5,
//           }}
//         >
//           <TextField
//             sx={{ mb: 4 }}
//             id="filled-basic"
//             label="Name"
//             variant="filled"
//             defaultValue={menuCategory.category}
//             onChange={(e) =>
//               setNewCategory({ ...newCategory, category: e.target.value })
//             }
//           />
//           {
//             <Button variant="contained" onClick={updateData}>
//               Update
//             </Button>
//           }
//         </Box>
//       ) : (
//         "NOT CATEGORY"
//       )}
//     </Layout>
//   );
// };

// export default MenuCategoryDetail;
