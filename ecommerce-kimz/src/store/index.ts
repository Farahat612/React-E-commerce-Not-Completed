// creating the store
import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from './categories/categoriesSlice'
import productsReducer from '@storeproducts/productsSlice'
import cartReducer from '@storecart/cartSlice'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {categories: ICategoriesState}
export type AppDispatch = typeof store.dispatch

// Exporting the store
export default store
