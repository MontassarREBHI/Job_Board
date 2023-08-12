import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface JobState {
  value: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    companyDesc:string;
    jobRequirement:string;
  }
}

const initialState: JobState = {
  value: {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    companyDesc:'',
    jobRequirement:'',
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    selectOffer: (state, action: PayloadAction<JobState['value']>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOffer } = jobSlice.actions;

export default jobSlice.reducer;
