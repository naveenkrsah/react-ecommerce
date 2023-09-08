import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchCategories,
  fetchBrands,
  fetchProductsByFilters,
  fetchProductsById,
  createProduct,
  updateProduct,
} from "./productApi";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  categories: [],
  brands: [],
  selectedProduct: null,
};

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, Pagination, admin }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      Pagination,
      admin
    );
    return response.data;
  }
);

export const fetchcategoriesAsync = createAsyncThunk(
  "product/fetchcategoriesAsync",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrandsAsync",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductsById(id);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchcategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectproducts = (state) => state.product.selectedProduct;

export default productSlice.reducer;
