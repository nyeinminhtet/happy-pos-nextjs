import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locations as Location } from "@prisma/client";
import { config } from "@/config/config";

interface LocationsState {
  isLoading: boolean;
  items: Location[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (companyId: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));

    const response = await fetch(
      `${config.apiBaseUrl}/locations?companyId=${companyId}`
    );
    const locations = await response.json();

    thunkAPI.dispatch(setIsLoading(false));
    thunkAPI.dispatch(setLocations(locations));
  }
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLocations: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.items = [...state.items, action.payload];
    },
    removeLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {
  setLocations,
  setIsLoading,
  addLocation,
  removeLocation,
  updateLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer;
