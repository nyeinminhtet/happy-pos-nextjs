import { createSlice } from "@reduxjs/toolkit";
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
  },
});

export const { setTables } = tablesSlice.actions;

export default tablesSlice.reducer;
