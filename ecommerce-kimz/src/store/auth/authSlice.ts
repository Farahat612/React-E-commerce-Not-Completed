// redux
import { createSlice } from '@reduxjs/toolkit'
// actions
import authRegister from './actions/authRegister'
import authLogin from './actions/authLogin'
// types
import { TLoading } from '@types'

// defining type for state
interface IAuthState {
  loading: TLoading
  error: string | null
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  } | null
  accessToken: string | null
}

// initial state
const initialState: IAuthState = {
  loading: 'idle',
  error: null,
  user: null,
  accessToken: null,
}

// createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = 'idle'
      state.error = null
    },
    authLogout: (state) => {
      state.user = null
      state.accessToken = null
    },
  },
  extraReducers: (builder) => {
    // Handling authRegister action states
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.loading = 'succeeded'
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
    // Handling authLogin action states
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

// Exporting the actions
export const { resetUI, authLogout } = authSlice.actions
// Exporting thunks
export { authRegister, authLogin }
// Exporting the reducer
export default authSlice.reducer
