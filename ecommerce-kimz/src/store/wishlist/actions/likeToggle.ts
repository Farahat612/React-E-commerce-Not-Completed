import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { axiosErrorHandler } from '@utils/index'
import { RootState } from '@store/store'

const likeToggle = createAsyncThunk(
  'wishlist/likeToggle',
  async (id: number, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    const userId = auth.user?.id
    try {
      const doesRecordExist = await axios.get(
        `/wishlist?userId=${userId}&productId=${id}`
      )

      if (doesRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${doesRecordExist.data[0].id}`)
        return { type: 'remove', id }
      } else {
        await axios.post('/wishlist', { userId: userId, productId: id })
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
