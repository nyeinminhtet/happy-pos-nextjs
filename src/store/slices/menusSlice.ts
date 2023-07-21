import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { menus as Menu } from "@prisma/client";

interface MenusState {
  isLoading: boolean;
  items: Menu[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setMenus, addMenu, removeMenu, updateMenu } = menusSlice.actions;

export default menusSlice.reducer;
