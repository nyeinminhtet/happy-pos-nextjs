import { createContext, useEffect, useState } from "react";
import { CartItem } from "../Types/Types";
import {
  menus as Menu,
  addons as Addons,
  menu_categories as MenuCategories,
  locations as Locations,
  addon_categories as AddonCategories,
  addons_menus as MenuAddon,
  menu_menu_categories_locations as MenuMenuCategoryLocaion,
  orders as Order,
  orderlines as Orderline,
} from "@prisma/client";
import { config } from "../config/config";
import { useRouter } from "next/router";

interface OrderType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  location: Locations[];
  addonMenu: MenuAddon[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocaion[];
  updateData: (value: any) => void;
  fetchData: () => void;
  cart: CartItem[];
  orders: Order[];
  orderlines: Orderline[];
  isloading: boolean;
}
export const defaultOrderMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  location: [],
  addonMenu: [],
  menusMenuCategoriesLocations: [],
  updateData: () => {},
  fetchData: () => {},
  cart: [],
  orders: [],
  orderlines: [],
  isloading: true,
};
export const OrderContent = createContext<OrderType>(defaultOrderMenu);

const OrderProvider = (props: any) => {
  const [data, updateData] = useState(defaultOrderMenu);
  const router = useRouter();
  const query = router.query;
  const locationId = query.locationId;

  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  //get all menus
  const fetchData = async () => {
    if (!locationId) return null;
    const response = await fetch(
      `${config.apiOrderBaseUrl}?locationId=${locationId}`
    );
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      location,
      addonMenu,
      orders,
      orderlines,
      menusMenuCategoriesLocations,
    } = responseJson;

    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      location,
      addonMenu,
      orders,
      orderlines,
      menusMenuCategoriesLocations,
      isloading: false,
    });
  };

  return (
    <OrderContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContent.Provider>
  );
};

export default OrderProvider;
