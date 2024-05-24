import { IProduct } from './index'

export type TorderItem = {
  id: number
  userId: number
  items: IProduct[]
  subtotal: number
}
