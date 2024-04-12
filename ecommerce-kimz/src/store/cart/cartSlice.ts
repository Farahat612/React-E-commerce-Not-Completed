import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@customTypesproduct'
import { TLoading } from '@customTypesshared'

import getProductsInfo from './actions/getProductsInfo'

// Defining a type for the slice state
interface ICartState {
  items: { [key: string]: number }
  productsFullInfo: IProduct[]
  loading: TLoading
  error: string | null
}

// Defining the initial state using that type
const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: 'idle',
  error: null,
}

// Creating the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload
      if (state.items[id]) {
        state.items[id]++
      } else {
        state.items[id] = 1
      }
    },
  },
  extraReducers: (builder) => {
    // Handling the getProductsInfo thunk actions
    builder.addCase(getProductsInfo.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(getProductsInfo.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.productsFullInfo = action.payload
      state.error = null
    })
    builder.addCase(getProductsInfo.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string
    })
  },
})

// Exporting the actions
export const { addToCart } = cartSlice.actions
// Exporting async thunks
export { getProductsInfo }
// Exporting the reducer
export default cartSlice.reducer
