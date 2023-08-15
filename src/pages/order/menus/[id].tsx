import { generateRandomId, getAddonCategoryByMenuId } from "@/utils";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import AddonCategories from "@/Components/order/AddonCategories";
import Quantity from "@/Components/order/Quantity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { CartItem } from "@/Types/Types";
import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";

import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

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
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <AiOutlineArrowLeft
          size={30}
          onClick={() => router.back()}
          cursor="pointer"
        />

        <Card
          sx={{
            width: 320,
            maxWidth: "100%",
            boxShadow: "lg",
          }}
        >
          <CardOverflow
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <AspectRatio sx={{ minWidth: 200 }}>
              <Image
                src={menu?.acess_url || ""}
                width={240}
                height={240}
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="body-lg" fontSize={{ xs: 20, sm: 25 }}>
              {menu?.name}
            </Typography>
            <Box>
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
            </Box>
          </CardContent>
          <CardOverflow>
            <Button
              variant="solid"
              sx={{ bgcolor: "#00235B" }}
              size="lg"
              onClick={handleAddToCart}
              disabled={isDisable}
            >
              Add to cart
            </Button>
          </CardOverflow>
        </Card>
      </Box>
    </Box>
  );
};
export default DetailMenu;
