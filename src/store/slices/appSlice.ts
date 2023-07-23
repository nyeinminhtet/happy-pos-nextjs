import { config } from "@/config/config";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setAddons } from "./addonsSlice";
import { setMenus } from "./menusSlice";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setLocations } from "./LocationsSlice";
import { setCompany } from "./companySlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setTables } from "./tablesSlice";
import { setOrders } from "./ordersSlice";
import { setOrderlines } from "./orderlinesSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocationsSlice";
import { RootState } from "..";
import { getLocationId } from "@/utils";

interface AppState {
  isloading: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isloading: false,
  error: null,
};

interface FetchAppDataPayload {
  locationId?: string;
}

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (payload: FetchAppDataPayload, thunkAPI) => {
    thunkAPI.dispatch(setApploading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${payload.locationId}`
    );
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
      menusMenuCategoriesLocations,
    } = responseJson;

    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(setCompany(company));
    thunkAPI.dispatch(setMenusAddonCategories(menuAddons));
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setApploading(false));
    const selectedLocationId = getLocationId();
    if (!selectedLocationId) {
      localStorage.setItem("selectedLocationId", locations[0].id);
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApploading: (state, action) => {
      state.isloading = action.payload;
    },
  },
});

export const { setApploading } = appSlice.actions;

export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;

export const selectMenus = (state: RootState) => state.menus.items;

export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectCompany = (state: RootState) => state.company.item;
export const selectTables = (state: RootState) => state.tables.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;

export const appData = createSelector(
  [
    selectAddonCategories,
    selectAddons,
    selectCompany,
    selectLocations,
    selectMenuCategories,
    selectMenus,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectOrderlines,
    selectOrders,
    selectTables,
  ],
  (
    addonCategories,
    addons,
    company,
    locations,
    menuCategories,
    menus,
    menuAddons,
    menusMenuCategoriesLocations,
    orderlines,
    orders,
    tables
  ) => {
    return {
      addonCategories,
      addons,
      company,
      locations,
      menuCategories,
      menus,
      menuAddons,
      menusMenuCategoriesLocations,
      orderlines,
      orders,
      tables,
    };
  }
);

export default appSlice.reducer;
