import { IProduct } from './index'

export type TorderItem = {
  id: number
  items: IProduct[]
  subtotal: number
}
