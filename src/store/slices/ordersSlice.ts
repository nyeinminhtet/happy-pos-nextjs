import { createSlice } from "@reduxjs/toolkit";
import { orders as Order } from "@prisma/client";

interface OrdersState {
  isLoading: boolean;
  items: Order[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
