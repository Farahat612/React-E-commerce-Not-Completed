import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosErrorHandler from '@utils/axiosErrorHandler'

// formdata type
type TFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

// register thunk
export const authRegister = createAsyncThunk(
  'auth/register',
  async (formData: TFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', formData)
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

// export
export default authRegister
