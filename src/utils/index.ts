import { CartItem } from "@/Types/Types";
import { config } from "@/config/config";
import {
  menus as Menu,
  menu_menu_categories_locations as MenuMenuCatgoriesLocation,
  locations as Location,
  addon_categories as AddonCategory,
  addons_menus as MenusAddons,
  menu_categories as MenuCategory,
  menu_menu_categories_locations,
  addons_menus,
  orderlines as Orderline,
} from "@prisma/client";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return "";
};

export const getLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locationId");
  }
  return "";
};

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderAppUrl}?locationId=${locationId}&tableId=${tableId}`;
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/jey_qrcode/locationId-${locationId}-tableId-${tableId}.png`;
};

export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menuCategroyId: number,
  menusMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === menuCategroyId)
    .map((item) => item.menu_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getMenusIdFromMenuMenuCategoryLocation = (
  locationId: string,
  menusMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  return menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_id);
};

export const getMenusByLocationId = (
  locationId: string,
  menusMenuCategoriesLocations: MenuMenuCatgoriesLocation[],
  menus: Menu[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getMenuCategoryIdByLocationId = (
  menCategory: MenuCategory[],
  locationId: string,
  menusMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_categories_id);
  return menCategory.filter((item) => validMenuCategoryIds.includes(item.id));
};

export const getLocationByMenuCategoryId = (
  locations: Location[],
  menuCategroyId: string,
  menusMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategroyId))
    .map((item) => item.location_id);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

export const getAddonCategoryByMenuId = (
  addonCategoies: AddonCategory[],
  menuId: string,
  menuAddons: MenusAddons[]
) => {
  const validAddonCategoryId = menuAddons
    .filter((item) => item.menu_id === Number(menuId))
    .map((item) => item.addon_category_id);
  return addonCategoies.filter((item) =>
    validAddonCategoryId.includes(item.id)
  );
};

export const getAddonCategoryByLocation = (
  menusMenuCategoriesLocations: menu_menu_categories_locations[],
  menuAddons: addons_menus[],
  locationId: string
) => {
  const locationMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_id);

  return menuAddons
    .filter((item) => locationMenuIds.includes(item.menu_id))
    .map((item) => item.addon_category_id);
};

export const getQuantityByOrderId = (
  orderlines: Orderline[],
  orderId: number
) => {
  const validOrderlines = orderlines.filter(
    (item) => item.order_id === orderId
  );
  const menuIds: number[] = [];
  validOrderlines.forEach((item) => {
    const hasAdded = menuIds.find((menuId) => menuId === item.menus_id);
    if (!hasAdded) menuIds.push(item.menus_id);
  });
  return menuIds.length;
};

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const addonPrice = curr.addons.reduce(
      (preAddon, currAddon) => (preAddon += currAddon.price),
      0
    );
    prev += (menuPrice + addonPrice) * curr.quantity;
    return prev;
  }, 0);
  return totalPrice;
};

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);
