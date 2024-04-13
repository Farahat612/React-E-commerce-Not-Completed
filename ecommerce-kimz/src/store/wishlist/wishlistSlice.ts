// redux toolkit
import { createSlice } from '@reduxjs/toolkit'
// types
import { TLoading } from '@customTypesshared'
import { IProduct } from '@customTypesproduct'

// Defining the type of the state
interface IWishlistState {
  itemsId: number[]
  productsFullInfo: IProduct[]
  error: null | string
  loading: TLoading
}

// Defining the initial state
const initialState: IWishlistState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: 'idle',
}

// creating the slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
})

// exporting the reducer
export default wishlistSlice.reducer
