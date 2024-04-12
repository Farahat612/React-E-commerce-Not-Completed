import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// importing the type of the response data
import { IProduct } from '@customTypesproduct'

// Defining the type of the response data
type TResponse = IProduct[]

// Defining the thunk
export const getProductsByCategoryPrefix = createAsyncThunk(
  'products/getProductsByCategoryPrefix',
  async (prefix: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || error.message)
      } else {
        return rejectWithValue(
          'An unexpected error occurred while fetching the product.'
        )
      }
    }
  }
)

// Exporting the thunk
export default getProductsByCategoryPrefix
