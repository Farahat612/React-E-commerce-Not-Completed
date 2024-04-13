import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message)
      } else {
        return rejectWithValue('An unexpected error')
      }
    }
  }
)

export default likeToggle
