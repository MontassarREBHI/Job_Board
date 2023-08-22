import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface JobState {
  value: {
    _id: string;
    title: string;
    description: string;
    companyDesc: string;
    jobRequirement: string;
    employerEmail: string;
  };
}

const initialState: JobState = {
  value: {
    _id: "",
    title: "",
    description: "",
    companyDesc: "",
    jobRequirement: "",
    employerEmail: "",
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    selectOffer: (state, action: PayloadAction<JobState["value"]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOffer } = jobSlice.actions;

export default jobSlice.reducer;
