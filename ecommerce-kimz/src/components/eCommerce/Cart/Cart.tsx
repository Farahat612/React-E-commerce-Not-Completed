import CartIcon from '@assets/svg/cart.svg?react'

import styles from './styles.module.css'
const { cartContainer, cartQuantity } = styles

const Cart = () => {
  return (
    <div className={cartContainer}>
      <CartIcon title='cart-icon' />
      <div className={cartQuantity}>0</div>
    </div>
  )
}

export default Cart
