import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/Types/Types";

interface CartState {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}

const initialState: CartState = {
  isLoading: false,
  items: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = cartSlice.actions;

export default cartSlice.reducer;
