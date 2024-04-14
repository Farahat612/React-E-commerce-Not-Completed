// react hooks
import { useEffect, useCallback } from 'react'
// redux
import { useAppSelector, useAppDispatch } from '@store/hooks'
import {
  getProductsInfo,
  itemQtyChange,
  removeFromCart,
  cleanCartProductsFullInfo,
} from '@store/cart/cartSlice'

// define the useCart hook
const useCart = () => {
  // redux
  const dispatch = useAppDispatch()
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  )
  // get the products info
  useEffect(() => {
    dispatch(getProductsInfo())
    return () => {
      dispatch(cleanCartProductsFullInfo())
    }
  }, [dispatch])
  // map the products info with the items in the cart
  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id], // add the quantity of the item in the cart
  }))
  // change the quantity of the item in the cart
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(itemQtyChange({ id, quantity }))
    },
    [dispatch]
  )
  // remove the item from the cart
  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id))
    },
    [dispatch]
  )

  return {
    products,
    loading,
    error,
    changeQuantityHandler,
    removeItemHandler,
  }
}

export default useCart
