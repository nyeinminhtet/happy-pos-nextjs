import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tables as Table } from "@prisma/client";

interface TablesState {
  isLoading: boolean;
  items: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items = [...state.items, action.payload];
    },
    removeTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setTables, addTable, removeTable, updateTable } =
  tablesSlice.actions;

export default tablesSlice.reducer;
