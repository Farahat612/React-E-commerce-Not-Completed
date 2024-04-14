import { createSlice } from '@reduxjs/toolkit'
// importing getCategories thunk
import getCategories from './actions/getCategories'
// Importing the types
import { ICategory, TLoading } from '@types'

// Defining types for the state
export interface ICategoriesState {
  records: ICategory[]
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
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    // Handling the getCategories.pending action
    builder.addCase(getCategories.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    // Handling the getCategories.fulfilled action
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.records = action.payload
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
// Exporting the actions
export const { categoriesCleanUp } = categoriesSlice.actions
// Exporting the reducer
export default categoriesSlice.reducer
