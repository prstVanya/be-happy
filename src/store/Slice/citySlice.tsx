import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityAdd } from "@/types";

interface CityState {
  buildings: ICityAdd[];
}

const initialState: CityState = {
  buildings: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setBuildings(state, action: PayloadAction<ICityAdd[]>) {
      state.buildings = action.payload;
    },
    addBuilding(state, action: PayloadAction<ICityAdd>) {
      state.buildings.push(action.payload);
    },
  },
});

export const { setBuildings, addBuilding } = citySlice.actions;
export default citySlice.reducer;