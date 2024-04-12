import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@storestore'
import axios from 'axios'
import { IProduct } from '@customTypesproduct'

// Define type of the response
type TResponse = IProduct[]

// Define the thunk
export const getProductsInfo = createAsyncThunk(
  'cart/getProductsInfo',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items)

    if (!itemsId.length) {
      return fulfillWithValue([])
    }
    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&')
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message)
      } else {
        return rejectWithValue(
          'An unexpected error while fetching the products.'
        )
      }
    }
  }
)

// Export the thunk
export default getProductsInfo
