import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
import axios from 'axios'
import { IProduct } from '@types'
import { axiosErrorHandler } from '@utils/index'

// Define type of the response
type TResponse = IProduct[]

// Define the thunk
export const getProductsInfo = createAsyncThunk(
  'cart/getProductsInfo',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items)

    if (!itemsId.length) {
      return fulfillWithValue([])
    }
    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&')
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
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

// Export the thunk
export default getProductsInfo
