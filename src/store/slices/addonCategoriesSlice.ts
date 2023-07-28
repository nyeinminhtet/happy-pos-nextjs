import { addon_categories as AddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonCategoriesState {
  isloading: boolean;
  items: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isloading: false,
  items: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = [...state.items, action.payload];
    },
    updateAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategory,
  removeAddonCategory,
  updateAddonCategory,
} = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
