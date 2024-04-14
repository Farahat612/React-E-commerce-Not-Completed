import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@storestore'
import axios from 'axios'
import { IProduct } from '@customTypesproduct'
import { axiosErrorHandler } from '@utilsindex'

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
      return rejectWithValue(
        axiosErrorHandler(error, 'Failed to fetch products')
      )
    }
  }
)

// Export the thunk
export default getProductsInfo
