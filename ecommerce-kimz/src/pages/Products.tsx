import { Product } from '@components/eCommerce'
import { Loading } from '@componentsfeedback'
import { GridList, Heading } from '@componentsshared'
// importing redux hooks
import { useAppDispatch, useAppSelector } from '@storehooks'
// importing the getProducts thunk and the productsCleanUp action
import { getProducts, productsCleanUp } from '@store/products/productsSlice'
// importing the useEffect hook
import { useEffect } from 'react'
// importing useParams
import { useParams } from 'react-router-dom'
// types
import { IProduct } from '@customTypesproduct'

const Products = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts(params.prefix as string))
    return () => {
      dispatch(productsCleanUp())
    }
  }, [dispatch, params])

  // Getting the cart items from the store
  const cartItems = useAppSelector((state) => state.cart.items)
  // Getting the wishlist items from the store
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId)
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItems.includes(el.id),
  }))

  // Displaying the products
  return (
    <>
      <Heading title={`${params.prefix?.toUpperCase()} Products`} />
      <Loading loading={loading} error={error}>
        <GridList<IProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}

export default Products
