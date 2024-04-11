// creating the store
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// redux persist
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import categoriesReducer from './categories/categoriesSlice'
import productsReducer from '@storeproducts/productsSlice'
import cartReducer from '@storecart/cartSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {categories: ICategoriesState}
export type AppDispatch = typeof store.dispatch

// Exporting the store
const persistor = persistStore(store)
export { store, persistor }
