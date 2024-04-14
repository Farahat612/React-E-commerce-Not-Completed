// styles
import styles from './styles.module.css'
// types
import { IProduct } from '@customTypes/product'

// Defining the props type
type CartSubTotalProps = {
  products: IProduct[]
}

const CartSubTotal = ({ products }: CartSubTotalProps) => {
  // calculate the total price
  const totalPrice = products.reduce((acc, el) => {
    const { price, quantity } = el
    return quantity && typeof quantity === 'number'
      ? acc + price * quantity
      : acc
  }, 0)
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span> {totalPrice.toFixed(2)} EGP</span>
    </div>
  )
}

export default CartSubTotal
