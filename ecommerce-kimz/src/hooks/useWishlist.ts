// react
import { useEffect } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getWishlist,
  wishListProductsFullInfoCleanUp,
} from '@store/wishlist/wishlistSlice'

// define the useWishlist hook
const useWishlist = () => {
  // redux
  const dispatch = useAppDispatch()
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  )

  // fetching the wishlist
  useEffect(() => {
    const promise = dispatch(getWishlist('productsFullInfo'))
    return () => {
      // clean up the productsFullInfo
      dispatch(wishListProductsFullInfoCleanUp())
      // abort the request if the component is unmounted
      promise.abort()
    }
  }, [dispatch])

  // getting cart items to show the quantity available of the product in the wishlist
  const cartItems = useAppSelector((state) => state.cart.items)
  const records = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
    quantity: cartItems[el.id],
    isAuthenticated: true,
  }))

  return {
    loading,
    error,
    records,
  }
}

export default useWishlist
