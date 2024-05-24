// styles
import styles from './styles.module.css'
// types
import { IProduct } from '@types'
import { Button } from 'react-bootstrap'

// Defining the props type
type CartSubTotalProps = {
  products: IProduct[]
  userAccessToken: string | null
}

const CartSubTotal = ({ products, userAccessToken }: CartSubTotalProps) => {
  // calculate the total price
  const totalPrice = products.reduce((acc, el) => {
    const { price, quantity } = el
    return quantity && typeof quantity === 'number'
      ? acc + price * quantity
      : acc
  }, 0)
  return (
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span> {totalPrice.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <>
          <div className={styles.container}>
            <span></span>
            <Button variant='info' className='text-white'>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default CartSubTotal
