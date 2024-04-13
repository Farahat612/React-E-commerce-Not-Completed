// react imports
import { useEffect, useCallback } from 'react'
// redux imports
import { useAppSelector, useAppDispatch } from '@storehooks'
import {
  getProductsInfo,
  itemQtyChange,
  removeFromCart,
  cleanCartProductsFullInfo,
} from '@storecart/cartSlice'
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
    return () => {
      dispatch(cleanCartProductsFullInfo())
    }
  }, [dispatch])

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }))

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(itemQtyChange({ id, quantity }))
    },
    [dispatch]
  )

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id))
    },
    [dispatch]
  )

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
