import { createSlice } from "@reduxjs/toolkit";
import { addons as Addon } from "@prisma/client";

interface AddonsState {
  isLoading: boolean;
  items: Addon[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAddons } = addonsSlice.actions;

export default addonsSlice.reducer;
