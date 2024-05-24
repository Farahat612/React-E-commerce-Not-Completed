import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
import axios from 'axios'
import { axiosErrorHandler } from '@utils/index'
import { TorderItem } from '@types'

// Define type of the response
type TResponse = TorderItem[]

// Define the thunk
const getOrdersPerUser = createAsyncThunk(
  'orders/getOrdersPerUser',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI
    const { auth } = getState() as RootState

    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
        { signal }
      )
      return res.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

// Export the thunk
export default getOrdersPerUser
