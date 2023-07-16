import { createSlice } from "@reduxjs/toolkit";
import { menu_categories as MenuCategory } from "@prisma/client";

interface MenuCategoryState {
  isLoading: boolean;
  items: MenuCategory[];
  error: Error | null;
}

const initialState: MenuCategoryState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCategories } = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
