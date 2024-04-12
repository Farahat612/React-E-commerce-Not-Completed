// react imports
import { useEffect } from 'react'
// redux imports
import { useAppSelector, useAppDispatch } from '@storehooks'
import { getProductsInfo } from '@storecart/cartSlice'
// Components
import { Heading } from '@componentsshared'
import { CartSubTotal, CartItemList } from '@componentseCommerce'
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

  const changeQuantityHandler = (id: number, quantity: number) => {
    console.log(id, quantity)
  }

  const removeItemHandler = (id: number) => {
    console.log(id)
  }

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />

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
