import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// importing the type of the response data
import { ICategory } from '@types'
import { axiosErrorHandler } from '@utils/index'

// Defining the type of the response data
type TResponse = ICategory[]

// Defining the thunk
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get<TResponse>('/categories', {
        signal,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        axiosErrorHandler(error, 'Failed to fetch categories')
      )
    }
  }
)

// Exporting the thunk
export default getCategories
