import { createContext, useEffect, useState } from "react";
import {
  AddonCategories,
  Addons,
  Locations,
  Menu,
  MenuCategories,
  Order,
} from "../Types/Types";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  locations: Locations[];
  updateData: (value: any) => void;
  fetchData: () => void;
  cart: Order[];
}
export const defaultOrderMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  updateData: () => {},
  fetchData: () => {},
  cart: [],
};
export const OrderContent = createContext<MenuType>(defaultOrderMenu);

const OrderProvider = (props: any) => {
  const [data, updateData] = useState(defaultOrderMenu);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  //get all menus
  const fetchData = async () => {
    const response = await fetch(`${config.apiOrderBaseUrl}?locationId=9`);
    const responseJson = await response.json();
    const { menus, menuCategories, addons, addonCategories, locations } =
      responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
    });
    console.log("order data", responseJson);
  };

  return (
    <OrderContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContent.Provider>
  );
};

export default OrderProvider;
