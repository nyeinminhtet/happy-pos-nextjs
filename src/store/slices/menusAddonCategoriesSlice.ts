import { createSlice } from "@reduxjs/toolkit";
import { addons_menus as MenuAddonCategory } from "@prisma/client";

interface MenusAddonCategoriesState {
  isLoading: boolean;
  items: MenuAddonCategory[];
  error: Error | null;
}

const initialState: MenusAddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories } = menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
