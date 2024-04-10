import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Defining the type of the response data
interface ICategory {
  id: number
  title: string
  prefix: string
  img: string
}

// Defining the thunk
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ICategory>(
        'http://localhost:5005/categories'
      )
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
