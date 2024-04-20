import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosErrorHandler from '@utils/axiosErrorHandler'

// formdata type
type TFormData = {
  email: string
  password: string
}

// response type
type TResponse = {
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
  accessToken: string
}

// login thunk
export const authLogin = createAsyncThunk(
  'auth/authLogin',
  async (formData: TFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post<TResponse>('/login', formData)
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default authLogin
