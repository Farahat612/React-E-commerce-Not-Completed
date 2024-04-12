import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// importing the type of the response data
import { ICategory } from '@customTypescategory'

// Defining the type of the response data
type TResponse = ICategory[]

// Defining the thunk
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<TResponse>('/categories')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || error.message)
      } else {
        return rejectWithValue(
          'An unexpected error occurred while fetching the categories.'
        )
      }
    }
  }
)

// Exporting the thunk
export default getCategories
