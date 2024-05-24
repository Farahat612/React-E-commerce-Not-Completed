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

// reducers
import categoriesReducer from './categories/categoriesSlice'
import productsReducer from '@store/products/productsSlice'
import cartReducer from '@store/cart/cartSlice'
import wishlistReducer from '@store/wishlist/wishlistSlice'
import authReducer from './auth/authSlice'
import ordersReducer from './orders/ordersSlice'

// persist configs
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
}
const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['user', 'accessToken'],
}
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
}

// combining the reducers
const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  orders: ordersReducer,
  wishlist: wishlistReducer,
})

// persisting the root reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

// creating the store
const store = configureStore({
  reducer: persistedReducer,
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
