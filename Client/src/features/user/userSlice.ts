import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
  value: {
    name: string;
    email: string;
    role: string;
    phone: number;
    address: string;
    CV: string;
  };
}

const initialState: userState = {
  value: {
    name: "",
    email: "",
    role: "",
    phone: 0,
    address: "",
    CV: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<userState["value"]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions;

export default userSlice.reducer;
