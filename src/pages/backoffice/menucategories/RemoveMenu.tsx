import { BackofficeContext } from "@/Contents/BackofficeContext";
import { config } from "@/config/config";
import { getLocationId } from "@/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  DialogActions,
  Button,
} from "@mui/material";
import { menus as Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext } from "react";

interface Props {
  menu?: Menu;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const RemoveMenuFromMenuCategory = ({ menu, open, setOpen }: Props) => {
  const selectedlocation = getLocationId() as string;
  const router = useRouter();
  const menuCategoryId = router.query.id as string;

  const removeMenu = async (menu: Menu) => {
    await fetch(`${config.apiBaseUrl}/menucategories/removeMenu`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        menuId: menu.id,
        locationId: selectedlocation,
        menuCategoryId: menuCategoryId,
      }),
    });
    // fetchData();
    setOpen(false);
  };

  if (!menu) return null;
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textTransform: "capitalize", color: "blue" }}>
        Remove menu from this category
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textTransform: "capitalize", color: "grey" }}>
          Are you sure? you want to remove this menu from this menu category?
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ textTransform: "capitalize" }}>
            Menu that will be removed from this menu category:{" "}
            <b>{menu.name}</b>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button variant="text" sx={{ mr: 3 }} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => removeMenu(menu)}>
            Yes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMenuFromMenuCategory;
