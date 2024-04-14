// custom hook
import useCart from '@hooksuseCart'

// Components
import { Heading } from '@componentsshared'
import { CartSubTotal, CartItemList } from '@componentseCommerce'
import { Loading } from '@componentsfeedback'

const Cart = () => {
  // use the custom hook
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart()

  return (
    <>
      <Heading title='Your Cart' />
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />

            <CartSubTotal products={products} />
          </>
        ) : (
          'Your Cart is empty'
        )}
      </Loading>
    </>
  )
}

export default Cart
