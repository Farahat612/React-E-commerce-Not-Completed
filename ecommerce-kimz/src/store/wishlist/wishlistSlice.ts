// redux toolkit
import { createSlice } from '@reduxjs/toolkit'
// types
import { TLoading } from '@customTypesshared'
import { IProduct } from '@customTypesproduct'
// actions
import likeToggle from './actions/likeToggle'
import getWishlist from './actions/getWishlist'

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
  reducers: {
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = []
    },
  },
  extraReducers: (builder) => {
    // Handling the pending, fulfilled, and rejected states of the likeToggle action
    builder.addCase(likeToggle.pending, (state) => {
      state.error = null
      // skipped loading because we are going to handle it inside the component itself
    })
    builder.addCase(likeToggle.fulfilled, (state, { payload }) => {
      const { type, id } = payload
      if (type === 'add') {
        state.itemsId.push(id)
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== id)
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== id
        )
      }
    })
    builder.addCase(likeToggle.rejected, (state, { payload }) => {
      state.error = payload as string
    })
    // Handling the pending, fulfilled, and rejected states of the getWishlist action
    builder.addCase(getWishlist.pending, (state) => {
      state.error = null
      state.loading = 'pending'
    })
    builder.addCase(getWishlist.fulfilled, (state, { payload }) => {
      state.productsFullInfo = payload
      state.loading = 'succeeded'
    })
    builder.addCase(getWishlist.rejected, (state, { payload }) => {
      state.error = payload as string
      state.loading = 'failed'
    })
  },
})

// exporting Thunks
export { likeToggle, getWishlist }
// exporting the action creator
export const { productsFullInfoCleanUp } = wishlistSlice.actions
// exporting the reducer
export default wishlistSlice.reducer
