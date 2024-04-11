import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@customTypesproduct'

// Defining a type for the slice state
interface ICartState {
  items: { [key: number]: number }
  productFullInfo: IProduct[]
}

// Defining the initial state using that type
const initialState: ICartState = {
  items: {},
  productFullInfo: [],
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
})

// Exporting the actions
export const { addToCart } = cartSlice.actions
// Exporting the reducer
export default cartSlice.reducer
