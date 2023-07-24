import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { companies as Company } from "@prisma/client";

interface CompanyState {
  isLoading: boolean;
  items: Company | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: false,
  items: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.items = action.payload;
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      state.items?.id === action.payload.id
        ? (state.items = action.payload)
        : state.items;
    },
  },
});

export const { setCompany, updateCompany } = companySlice.actions;

export default companySlice.reducer;
