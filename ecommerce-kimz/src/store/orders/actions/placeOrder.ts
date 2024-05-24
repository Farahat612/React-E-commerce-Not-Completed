import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
import axios from 'axios'
import { axiosErrorHandler } from '@utils/index'

// Define the thunk
const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { cart, auth } = getState() as RootState

    const cartItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      quantity: cart.items[el.id],
      img: el.img,
    }))

    try {
      const res = await axios.post('/orders', {
        userId: auth.user?.id,
        items: cartItems,
        subtotal,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

// Export the thunk
export default placeOrder
