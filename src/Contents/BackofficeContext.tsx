import { createContext, useEffect, useState } from "react";
import {
  menus as Menu,
  addons as Addons,
  menu_categories as MenuCategories,
  locations as Locations,
  addon_categories as AddonCategories,
  menu_menu_categories_locations as MenuMenuCategoriesLocations,
  companies as Company,
  addons_menus as MenuAddon,
  tables as Table,
  orders as Order,
  orderlines as Orderline,
} from "@prisma/client";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  menuAddons: MenuAddon[];
  addonCategories: AddonCategories[];
  locations: Locations[];
  menusMenuCategoriesLocations: MenuMenuCategoriesLocations[];
  company: Company | null;
  tables: Table[];
  orders: Order[];
  orderlines: Orderline[];
  isLoading: Boolean;
  updateData: (value: any) => void;
  fetchData: () => void;
}
export const defaultBackofficeMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menuAddons: [],
  menusMenuCategoriesLocations: [],
  locations: [],
  company: null,
  tables: [],
  orders: [],
  orderlines: [],
  isLoading: true,
  updateData: () => {},
  fetchData: () => {},
};
export const BackofficeContext = createContext<MenuType>(defaultBackofficeMenu);

const BackofficeProvider = (props: any) => {
  const [data, updateData] = useState(defaultBackofficeMenu);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  //get all menus
  const fetchData = async () => {
    const response = await fetch(`${config}`);
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      company,
      menuAddons,
      tables,
      orders,
      orderlines,
      menuMenuCategoriesLocations,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      company,
      menuAddons,
      tables,
      orders,
      orderlines,
      menuMenuCategoriesLocations,
      isLoading: false,
    });
    console.log("backoffice data", responseJson);
  };

  return (
    <BackofficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContext.Provider>
  );
};

export default BackofficeProvider;
