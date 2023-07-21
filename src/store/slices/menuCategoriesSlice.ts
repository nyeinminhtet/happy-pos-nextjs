import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setMenuCategories,
  setIsLoading,
  addMenuCategory,
  removeMenuCategory,
} = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
