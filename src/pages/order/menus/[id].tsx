import { generateRandomId, getAddonCategoryByMenuId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import AddonCategories from "@/Components/AddonCategories";
import Quantity from "@/Components/Quantity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { CartItem } from "@/Types/Types";
import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";

const DetailMenu = () => {
  const router = useRouter();
  const menuId = router.query.id as string;
  const { menus, addonCategories, addons, menuAddons } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isDisable, setIsDisable] = useState(false);

  const menu = menus.find((item) => item.id === Number(menuId));

  const validAddonCategories = getAddonCategoryByMenuId(
    addonCategories,
    menuId,
    menuAddons
  );
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  useEffect(() => {
    const requiredAddonCategory = validAddonCategories.filter(
      (item) => item.is_require
    );

    if (requiredAddonCategory.length) {
      if (!selectedAddons.length) {
        setIsDisable(true);
      } else {
        const requireAddons = selectedAddons.filter((addon) => {
          const addonCategory = validAddonCategories.find(
            (item) => addon.addon_category_id === item.id
          );
          if (addonCategory?.is_require) {
            return true;
          } else {
            return false;
          }
        });
        const hasSelectedAllRequireAddons =
          requiredAddonCategory.length === requireAddons.length;
        setIsDisable(hasSelectedAllRequireAddons ? false : true);
      }
    }
  }, [selectedAddons, validAddonCategories]);

  //added addon
  const handleAddonSelect = (selected: boolean, addon: Addon) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addon_category_id
    ) as AddonCategory;
    if (addonCategory.is_require) {
      const toRemoveAddon = selectedAddons.find(
        (item) => item.addon_category_id === addon.addon_category_id
      );
      let newSelectedAddon: Addon[] = [];

      if (toRemoveAddon) {
        const filterAddon = selectedAddons.filter(
          (item) => item.id !== toRemoveAddon.id
        );
        newSelectedAddon = [...filterAddon, addon];
      } else {
        newSelectedAddon = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddon);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter((item) => item.id !== addon.id),
        ]);
      }
    }
  };

  //add to cart
  const handleAddToCart = () => {
    if (!menu) return null;
    const cartItems: CartItem = {
      id: generateRandomId(),
      menu,
      quantity,
      addons: selectedAddons,
    };
    dispatch(addToCart(cartItems));
    router.back();
  };

  //check quantity
  const handleQuantityOnDecrease = () => {
    const newQuantity = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newQuantity);
  };
  const handleQuantityOnIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        p: 4,
        position: "relative",
        bgcolor: "#98DFD6",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "white",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: 5,
        }}
      >
        <Image
          src={menu?.acess_url || ""}
          alt="menu-image"
          width={150}
          height={150}
          style={{
            borderRadius: "50%",
          }}
        />
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          {menu?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AddonCategories
          validAddonCategories={validAddonCategories}
          validAddons={validAddons}
          selectedAddons={selectedAddons}
          onChange={(checked, item) => handleAddonSelect(checked, item)}
        />
        <Quantity
          value={quantity}
          decrease={handleQuantityOnDecrease}
          increase={handleQuantityOnIncrease}
        />

        <Button
          variant="contained"
          disabled={isDisable}
          onClick={handleAddToCart}
          sx={{ mt: 3, width: "fit-content" }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};
export default DetailMenu;
