// react hooks
import { useEffect } from 'react'
// router-dom
import { useParams } from 'react-router-dom'

// redux
import { useAppDispatch, useAppSelector } from '@storehooks'
import { getProducts, productsCleanUp } from '@storeproducts/productsSlice'

// Defining the useProducts hook
const useProducts = () => {
  // Getting the category prefix from the URL
  const { prefix } = useParams<{ prefix: string }>()

  // redux
  const dispatch = useAppDispatch()
  const { records, loading, error } = useAppSelector((state) => state.products)
  // cart and wishlist items
  const cartItems = useAppSelector((state) => state.cart.items)
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId)

  // Fetching the products
  useEffect(() => {
    const promise = dispatch(getProducts(prefix as string))

    return () => {
      // Cleaning up the products slice
      dispatch(productsCleanUp())
      // Cancelling the request
      promise.abort()
    }
  }, [dispatch, prefix])

  // ProductsFullInfo
  const productsFullInfo = records.map((product) => ({
    ...product,
    quantity: cartItems[product.id],
    isLiked: wishlistItems.includes(product.id),
  }))

  return { loading, error, productsFullInfo, prefix }
}

// Exporting the useProducts hook
export default useProducts
