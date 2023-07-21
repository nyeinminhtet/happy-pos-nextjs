import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.items = [...state.items, action.payload];
    },
    removeAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddons, addAddon, removeAddon } = addonsSlice.actions;

export default addonsSlice.reducer;
