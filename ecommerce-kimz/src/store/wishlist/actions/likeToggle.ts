import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { axiosErrorHandler } from '@utilsindex'

const likeToggle = createAsyncThunk(
  'wishlist/likeToggle',
  async (id: number, { rejectWithValue }) => {
    try {
      const doesRecordExist = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      )

      if (doesRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${doesRecordExist.data[0].id}`)
        return { type: 'remove', id }
      } else {
        await axios.post('/wishlist', { userId: 1, productId: id })
        return { type: 'add', id }
      }
    } catch (error) {
      return rejectWithValue(
        axiosErrorHandler(error, 'Failed to toggle wishlist')
      )
    }
  }
)

export default likeToggle
