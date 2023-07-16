import { createSlice } from "@reduxjs/toolkit";
import { orderlines as Orderline } from "@prisma/client";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderline[];
  error: Error | null;
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setOrderlines } = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
