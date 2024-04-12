import CartItem from '../CartItem/CartItem'
import { IProduct } from '@customTypesproduct'

// Defining the props type
type CartItemListProps = {
  products: IProduct[]
  changeQuantityHandler: (id: number, quantity: number) => void
  removeItemHandler: (id: number) => void
}

const CartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemListProps) => {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ))

  return <div>{renderList}</div>
}

export default CartItemList
