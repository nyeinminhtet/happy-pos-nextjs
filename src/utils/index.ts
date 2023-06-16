import { config } from "@/config/config";
import {
  menus as Menu,
  menu_menu_categories_locations as MenuMenuCatgoriesLocation,
  locations as Location,
  addon_categories as AddonCategory,
  addons_menus as MenusAddons,
  menu_categories as MenuCategory,
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
  return `${config.apiOrderBaseUrl}?locationId=${locationId}&tableId=${tableId}`;
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/jey_qrcode/locationId-${locationId}-tableId-${tableId}.png`;
};

export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menuCategroyId: string,
  menuMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const selectedLocation = getLocationId() as string;
  const validMenuIds = menuMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategroyId))
    .map((item) => item.menu_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getMenusIdFromMenuMenuCategoryLocation = (
  locationId: string,
  menuMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  return menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_id);
};

export const getMenusByLocationId = (
  locationId: string,
  menuMenuCategoriesLocations: MenuMenuCatgoriesLocation[],
  menus: Menu[]
) => {
  const validMenuIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getMenuCategoryIdByLocationId = (
  menCategory: MenuCategory[],
  locationId: string,
  menuMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const validMenuCategoryIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(locationId))
    .map((item) => item.menu_categories_id);
  return menCategory.filter((item) => validMenuCategoryIds.includes(item.id));
};

export const getLocationByMenuCategoryId = (
  locations: Location[],
  menuCategroyId: string,
  menuMenuCategoriesLocations: MenuMenuCatgoriesLocation[]
) => {
  const validLocationIds = menuMenuCategoriesLocations
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
