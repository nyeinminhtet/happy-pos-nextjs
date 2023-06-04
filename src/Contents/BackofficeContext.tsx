import { createContext, useEffect, useState } from "react";
import {
  menus as Menu,
  addons as Addons,
  menu_categories as MenuCategories,
  locations as Locations,
  addon_categories as AddonCategories,
  menu_menu_categories_locations as MenuMenuCategoriesLocations,
  companies as Company,
} from "@prisma/client";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  locations: Locations[];
  menuMenuCategoriesLocations: MenuMenuCategoriesLocations[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}
export const defaultBackofficeMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menuMenuCategoriesLocations: [],
  locations: [],
  company: null,
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
    const response = await fetch(`${config.apiBackofficeBaseUrl}`);
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      company,
      menuMenuCategoriesLocations,
    } = responseJson;
    console.log("responseJson", responseJson);
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      company,
      menuMenuCategoriesLocations,
    });
    // console.log("backoffice data", responseJson);
  };

  return (
    <BackofficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContext.Provider>
  );
};

export default BackofficeProvider;
