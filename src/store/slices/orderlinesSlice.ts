import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderStatus, orderlines as Orderline } from "@prisma/client";
import { config } from "@/config/config";
import { useAppDispatch } from "../hooks";

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

interface UpdateOrderlinePayload {
  cartId: string;
  status: OrderStatus;
}

export const updateOrderlineStatus = createAsyncThunk(
  "orderlines/updateOrderlineStatus",
  async (payload: UpdateOrderlinePayload, thunkAPI) => {
    await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    thunkAPI.dispatch(updateOrderline(payload));
  }
);

export const refetchOrderline = createAsyncThunk(
  "orderlines/refetch",
  async (orderId: number, thunkAPI) => {
    const response = await fetch(
      `${config.apiBaseUrl}/orderlines?orderId=${orderId}`
    );
    const newOrderline = await response.json();
    newOrderline.map((item: Orderline) =>
      thunkAPI.dispatch(addOrderline(item))
    );
  }
);

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action) => {
      state.items = action.payload;
    },
    updateOrderline: (
      state,
      action: PayloadAction<{ cartId: string; status: OrderStatus }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.cart_id === action.payload.cartId) {
          return { ...item, status: action.payload.status };
        }
        return item;
      });
    },
    addOrderline: (state, action: PayloadAction<Orderline>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setOrderlines, updateOrderline, addOrderline } =
  orderlinesSlice.actions;

export default orderlinesSlice.reducer;
