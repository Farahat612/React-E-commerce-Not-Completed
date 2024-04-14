import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// importing the type of the response data
import { IProduct } from '@customTypes/product'
import { axiosErrorHandler } from '@utils/index'

// Defining the type of the response data
type TResponse = IProduct[]

// Defining the thunk
export const getProductsByCategoryPrefix = createAsyncThunk(
  'products/getProductsByCategoryPrefix',
  async (prefix: string, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        axiosErrorHandler(error, 'Failed to fetch products')
      )
    }
  }
)

// Exporting the thunk
export default getProductsByCategoryPrefix
