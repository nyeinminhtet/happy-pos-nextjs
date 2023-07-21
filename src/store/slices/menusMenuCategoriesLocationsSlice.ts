import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { menu_menu_categories_locations as MenuMenuCategoryLocation } from "@prisma/client";
import { config } from "@/config/config";

interface MenusMenuCategoriesLocationsState {
  isLoading: boolean;
  items: MenuMenuCategoryLocation[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesLocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchMenusMenuCategoriesLocations = createAsyncThunk(
  "menusMenuCategoriesLocationsSlice/fetchMenusMenuCategoriesLocations",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations?locationId=${locationId}`
    );
    const menusMenuCategoriesLocations = await response.json();
    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
  }
);

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenuMenuCategoryLocation[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations, setIsLoading } =
  menusMenuCategoriesLocationsSlice.actions;

export default menusMenuCategoriesLocationsSlice.reducer;
