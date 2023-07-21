import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addons_menus as MenuAddonCategory } from "@prisma/client";
import { config } from "@/config/config";

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

export const fetchMenusAddonCategories = createAsyncThunk(
  "menusAddonCategories/fetchMenusAddonCategories",
  async (menuIds: number[], thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusAddonCategories?menuIds=${menuIds.join(",")}`
    );
    const menusAddonCategories = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
  }
);

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMenusAddonCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories, setIsLoading } =
  menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
