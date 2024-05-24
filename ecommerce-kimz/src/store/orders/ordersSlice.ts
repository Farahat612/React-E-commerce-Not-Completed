import { createSlice } from '@reduxjs/toolkit'
import { TorderItem, TLoading } from '@types'

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
    // Add the order to the orders list
    addOrder(state, action) {
      state.orderList.push(action.payload)
    },
  },
})

// Exporting the actions
export const { addOrder } = ordersSlice.actions

// Exporting async thunk and selectors

// Exporting the reducer
export default ordersSlice.reducer
