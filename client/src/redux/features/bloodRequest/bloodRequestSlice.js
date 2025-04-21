import { createSlice } from "@reduxjs/toolkit";

const bloodRequestSlice = createSlice({
  name: "bloodRequest",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setRequests, setLoading, setError } = bloodRequestSlice.actions;
export default bloodRequestSlice;
