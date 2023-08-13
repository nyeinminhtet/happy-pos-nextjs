import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addons as Addon,
  addon_categories as AddonCategory,
} from "@prisma/client";
import { getAddonCategoryByMenuId } from "@/utils";
import { Box } from "@mui/material";
import AddonCategories from "@/Components/AddonCategories";
import Quantity from "@/Components/Quantity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { selectCart, updateCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

const MenuUpdate = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const { addonCategories, addons, menuAddons } = useAppSelector(appData);
  const { items } = useAppSelector(selectCart);

  const cartItemId = query.id as string;
  const cartItem = items.find((item) => item.id === cartItemId); //

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
                src={cartItem?.menu?.acess_url || ""}
                width={140}
                height={140}
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="body-lg" fontSize={{ xs: 20, sm: 25 }}>
              {cartItem?.menu?.name}
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
              size="lg"
              onClick={handleUpdateCart}
              disabled={isDisable}
              sx={{ bgcolor: "#00235B" }}
            >
              Update
            </Button>
          </CardOverflow>
        </Card>
      </Box>
    </Box>
  );
};

export default MenuUpdate;
