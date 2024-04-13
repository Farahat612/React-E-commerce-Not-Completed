// react hooks
import { useEffect } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '@storehooks'
import {
  getWishlist,
  wishListProductsFullInfoCleanUp,
} from '@storewishlist/wishlistSlice'
// components
import { Heading, GridList } from '@componentsshared'
import { Product } from '@componentseCommerce'
import { Loading } from '@componentsfeedback'
// types
import { IProduct } from '@customTypesproduct'

const WishList = () => {
  // initializing the dispatch
  const dispatch = useAppDispatch()

  // getting the wishlist state
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  )

  // getting cart items to show the quantity available of the product in the wishlist
  const cartItems = useAppSelector((state) => state.cart.items)

  // fetching the wishlist
  useEffect(() => {
    dispatch(getWishlist())
    return () => {
      dispatch(wishListProductsFullInfoCleanUp())
    }
  }, [dispatch])

  // defining the wishlist items
  const records = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
    quantity: cartItems[el.id],
  }))

  return (
    <>
      <Heading title='Your Wishlist' />
      <Loading loading={loading} error={error}>
        {records.length > 0 ? (
          <GridList<IProduct>
            records={records}
            renderItem={(item) => <Product {...item} />}
          />
        ) : (
          'Your wishlist is empty'
        )}
      </Loading>
    </>
  )
}

export default WishList
