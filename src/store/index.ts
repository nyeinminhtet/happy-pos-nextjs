import { configureStore } from "@reduxjs/toolkit";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import cartSlice from "./slices/cartSlice";
import companySlice from "./slices/companySlice";
import locationsSlice from "./slices/LocationsSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocationsSlice";
import menusSlice from "./slices/menusSlice";
import orderlinesSlice from "./slices/orderlinesSlice";
import ordersSlice from "./slices/ordersSlice";
import tablesSlice from "./slices/tablesSlice";
import appSlice from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    addonCategories: addonCategoriesSlice,
    addons: addonsSlice,
    cart: cartSlice,
    company: companySlice,
    locations: locationsSlice,
    menuCategories: menuCategoriesSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    menus: menusSlice,
    orderlines: orderlinesSlice,
    orders: ordersSlice,
    tables: tablesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
