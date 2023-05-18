import { createContext, useEffect, useState } from "react";
import {
  AddonCategories,
  Addons,
  Company,
  Locations,
  Menu,
  MenuCategories,
  MenuLocations,
} from "../Types/Types";
import { config } from "../config/config";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  locations: Locations[];
  company: Company | null;
  menuLocations: MenuLocations[];
  updateData: (value: any) => void;
  fetchData: () => void;
}
export const defaultMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};
export const MenuContent = createContext<MenuType>(defaultMenu);

const MenuProvider = (props: any) => {
  const [data, updateData] = useState(defaultMenu);
  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  //get all menus
  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    });
    console.log("all data", responseJson);
  };

  return (
    <MenuContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </MenuContent.Provider>
  );
};

export default MenuProvider;
