import { addon_categories as AddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setAddonCategories } = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
