// react imports
import { useEffect } from 'react'
// redux imports
import { useAppSelector, useAppDispatch } from '@storehooks'
import { getProductsInfo } from '@storecart/cartSlice'
// Components
import { Heading } from '@componentsshared'
import { CartSubTotal } from '@componentseCommerce'
import { Loading } from '@componentsfeedback'

const Cart = () => {
  const dispatch = useAppDispatch()
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  )
  useEffect(() => {
    dispatch(getProductsInfo())
  }, [dispatch])

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }))

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            {products.map((product) => (
              <h1 key={product.id}>{product.title}</h1>
            ))}

            <CartSubTotal />
          </>
        ) : (
          'Your Cart is empty'
        )}
      </Loading>
    </>
  )
}

export default Cart
