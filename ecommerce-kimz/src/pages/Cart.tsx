// custom hook
import useCart from '@hooks/useCart'

// Components
import { Heading } from '@components/shared/index'
import { CartSubTotal, CartItemList } from '@components/eCommerce/index'
import { Loading } from '@components/feedback/index'
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler'

const Cart = () => {
  // use the custom hook
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart()

  return (
    <>
      <Heading title='Your Cart' />
      <Loading loading={loading} error={error} type='cart'>
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
          <LottieHandler type='empty' message='Your cart is empty' />
        )}
      </Loading>
    </>
  )
}

export default Cart
