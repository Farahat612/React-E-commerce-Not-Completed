import { createSlice } from '@reduxjs/toolkit'
import { TorderItem, TLoading } from '@types'

import placeOrder from './actions/placeOrder'

// Defining a type for the slice state
interface IOrderState {
  orderList: TorderItem[]
  loading: TLoading
  error: string | null
}

// Defining the initial state using that type
const initialState: IOrderState = {
  orderList: [],
  loading: 'idle',
  error: null,
}

// Creating the slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // reset the state
    resetOrderStatus: (state) => {
      state.error = null
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    // handling place order thunk actions
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.loading = 'succeeded'
    })
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string
    })
  },
})

// Exporting the actions
export const { resetOrderStatus } = ordersSlice.actions

// Exporting async thunk and selectors
export { placeOrder }

// Exporting the reducer
export default ordersSlice.reducer
