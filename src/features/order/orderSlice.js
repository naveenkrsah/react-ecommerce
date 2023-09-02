import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchCount, updateOrder } from './orderApi';
 
const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrders:0
};

export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
     return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'counter/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'counter/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order)=>order.id===action.payload.id);
        state.orders[index] = action.payload;
      })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state)=>state.order.currentOrder;
export const selectOrder = (state)=>state.order.orders;
export const selectTotalOrders = (state)=>state.order.totalOrders;

export default orderSlice.reducer;
