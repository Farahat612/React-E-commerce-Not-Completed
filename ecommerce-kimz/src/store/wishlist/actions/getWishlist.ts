import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct } from '@customTypesproduct'
import { axiosErrorHandler } from '@utilsindex'

type TResponse = IProduct[]

const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        '/wishlist?userId=1'
      )

      if (!userWishlist.data.length) {
        return fulfillWithValue([])
      }

      const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join('&')

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        axiosErrorHandler(error, 'Failed to fetch wishlist')
      )
    }
  }
)

export default getWishlist
