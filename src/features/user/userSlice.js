import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount, fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userApi';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo: null
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'counter/updateUser',
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'counter/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        // state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
  },
});

export const { increment } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrder = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default userSlice.reducer;
