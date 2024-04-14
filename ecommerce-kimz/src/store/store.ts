// creating the store
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// redux persist
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import categoriesReducer from './categories/categoriesSlice'
import productsReducer from '@store/products/productsSlice'
import cartReducer from '@store/cart/cartSlice'
import wishlistReducer from '@store/wishlist/wishlistSlice'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
}

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['itemsId'],
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
})

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: rootReducer,
  // solving the non-serializable value cosole warning issue
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {categories: ICategoriesState}
export type AppDispatch = typeof store.dispatch

// Exporting the store
const persistor = persistStore(store)
export { store, persistor }
