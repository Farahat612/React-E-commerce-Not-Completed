import { createSlice } from '@reduxjs/toolkit'

// Defining types for the state
export interface ICategoriesState {
  records: {id:number, title:string, prefix:string, img:string}[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

// Defining the initial state
const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null
}

// Creating the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {}
})

// Exporting the reducer
export default categoriesSlice.reducer
 
//  Now that we have the slice, let's create the  categories  store. 
 // Path: ecommerce-kimz/src/store/index.ts