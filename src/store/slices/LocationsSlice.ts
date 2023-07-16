import { createSlice } from "@reduxjs/toolkit";
import { locations as Location } from "@prisma/client";

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

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
