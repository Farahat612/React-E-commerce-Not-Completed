import { Heading } from '@componentsshared'
import { CartItem, CartSubTotal } from '@componentseCommerce'

const Cart = () => {
  return (
    <div>
      <Heading>Cart</Heading>
      <CartItem />
      <CartItem />
      <CartItem />

      <CartSubTotal />
    </div>
  )
}

export default Cart
