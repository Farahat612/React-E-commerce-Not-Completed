import { createSlice } from '@reduxjs/toolkit'
// importing getCategories thunk
import getCategories from './actions/getCategories'

// Defining types for the state
export interface ICategoriesState {
  records: { id: number; title: string; prefix: string; img: string }[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

// Defining the initial state
const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
}

// Creating the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling the getCategories.pending action
    builder.addCase(getCategories.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    // Handling the getCategories.fulfilled action
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.records.push(action.payload)
      state.error = null
    })
    // Handling the getCategories.rejected action
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string | null // Type assertion is required here because the payload type is unknown
    })
  },
})

// Exporting the getCategories thunk
export { getCategories }
// Exporting the reducer
export default categoriesSlice.reducer

//  Now that we have the slice, let's create the  categories  store.
// Path: ecommerce-kimz/src/store/index.ts
