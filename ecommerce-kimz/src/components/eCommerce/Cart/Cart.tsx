import CartIcon from '@assets/svg/cart.svg?react'

// redux
import { useAppSelector } from '@storehooks'
import { getCartTotalQuantitySelector } from '@storecart/selectors/cartSelectors'

import styles from './styles.module.css'
const { cartContainer, cartQuantity } = styles

const Cart = () => {
  const cartQty = useAppSelector(getCartTotalQuantitySelector)

  return (
    <div className={cartContainer}>
      <CartIcon title='cart-icon' />
      <div className={cartQuantity}> {cartQty} </div>
    </div>
  )
}

export default Cart
