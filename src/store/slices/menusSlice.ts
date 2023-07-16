import { createSlice } from "@reduxjs/toolkit";
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
  },
});

export const { setMenus } = menusSlice.actions;

export default menusSlice.reducer;
