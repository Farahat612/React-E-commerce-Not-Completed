import { createSlice } from '@reduxjs/toolkit'
// importing getProducts thunk
import getProducts from './actions/getProducts'
// Importing the types
import { IProduct } from '@customTypesproduct'
import { TLoading } from '@customTypesshared'

// Defining types for the state
export interface ICategoriesState {
  records: IProduct[]
  loading: TLoading
  error: string | null
}

// Defining the initial state
const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
}

// Creating the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    // Handling the getProducts.pending action
    builder.addCase(getProducts.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    // Handling the getProducts.fulfilled action
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.records = action.payload
      state.error = null
    })
    // Handling the getProducts.rejected action
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string | null // Type assertion is required here because the payload type is unknown
    })
  },
})

// Exporting the actions
export const { productsCleanUp } = productsSlice.actions
// Exporting the getProducts thunk
export { getProducts }
// Exporting the reducer
export default productsSlice.reducer
