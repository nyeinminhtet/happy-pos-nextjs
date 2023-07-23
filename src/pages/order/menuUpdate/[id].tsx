import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addons as Addon,
  addon_categories as AddonCategory,
} from "@prisma/client";
import { getAddonCategoryByMenuId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import AddonCategories from "@/Components/AddonCategories";
import Quantity from "@/Components/Quantity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { selectCart, updateCart } from "@/store/slices/cartSlice";

const MenuUpdate = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const { addonCategories, addons, menuAddons } = useAppSelector(appData);
  const { items } = useAppSelector(selectCart);

  const cartItemId = query.id as string;
  const cartItem = items.find((item) => item.id === cartItemId);

  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isDisable, setIsDisable] = useState(false);

  const validAddonCategories = cartItem
    ? getAddonCategoryByMenuId(
        addonCategories,
        String(cartItem?.menu.id),
        menuAddons
      )
    : [];
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  //update cart
  const handleUpdateCart = () => {
    if (!cartItem) return;

    const cartUpdate = {
      id: cartItemId,
      menu: cartItem.menu,
      addons: selectedAddons,
      quantity,
    };
    dispatch(updateCart(cartUpdate));

    router.push({ pathname: "/order/cart", query });
  };

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

  useEffect(() => {
    if (cartItem) {
      const selectedAddons = items.find(
        (item) => item.menu.id === cartItem.menu.id
      )?.addons as Addon[];
      setSelectedAddons(selectedAddons);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem, items]);

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
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        {cartItem?.menu.name}
      </Typography>
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
        onClick={handleUpdateCart}
        sx={{ mt: 3, width: "fit-content" }}
      >
        Update
      </Button>
    </Box>
  );
};

export default MenuUpdate;
