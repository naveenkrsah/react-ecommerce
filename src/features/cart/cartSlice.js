import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemsFromCart, fetchItemsByUserId, updateCart } from './cartApi';

const initialState = {
  status: 'idle',
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (userId) => {
    const response = await updateCart(userId);
    return response.data;
  }
);
export const deleteItemsFromCartAsync = createAsyncThunk(
  'cart/deleteItemsFromCart',
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectCount = (state) => state.cart.items;

export default counterSlice.reducer;
