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
import { useSession } from "next-auth/react";

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
export const defaultBackofficeMenu = {
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
export const BackofficeContent = createContext<MenuType>(defaultBackofficeMenu);

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
    console.log("backoffice data", responseJson);
  };

  return (
    <BackofficeContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContent.Provider>
  );
};

export default BackofficeProvider;
