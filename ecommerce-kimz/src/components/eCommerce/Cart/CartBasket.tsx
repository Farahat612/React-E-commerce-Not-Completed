import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CartIcon from '@assets/svg/cart.svg?react'

// redux
import { useAppSelector } from '@storehooks'
import { getCartTotalQuantitySelector } from '@storecart/selectors/cartSelectors'

import styles from './styles.module.css'
const { cartContainer, cartQuantity, pumpCartQuantity, cart } = styles

const Cart = () => {
  const cartQty = useAppSelector(getCartTotalQuantitySelector)

  const [isAnimate, setIsAnimate] = useState(false)
  const quantityStyle = `${cartQuantity} ${isAnimate ? pumpCartQuantity : ''}`
  useEffect(() => {
    if (!cartQty) {
      return
    }
    setIsAnimate(true)

    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 300)

    return () => clearTimeout(debounce)
  }, [cartQty])

  const navigate = useNavigate()
  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <div className={cartContainer} onClick={handleCartClick}>
      <div className={cart}>
        <CartIcon title='cart-icon' />
        <div className={quantityStyle}> {cartQty} </div>
      </div>
      <h3>Cart</h3>
    </div>
  )
}

export default Cart
