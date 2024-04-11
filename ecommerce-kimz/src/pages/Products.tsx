import { Product } from '@components/eCommerce'
import { Loading } from '@componentsfeedback'
import { GridList } from '@componentsshared'
// importing redux hooks
import { useAppDispatch, useAppSelector } from '@storehooks'
// importing the getProducts thunk and the productsCleanUp action
import { getProducts, productsCleanUp } from '@store/products/productsSlice'
// importing the useEffect hook
import { useEffect } from 'react'
// importing useParams
import { useParams } from 'react-router-dom'

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

  // Displaying the products
  return (
    <Loading loading={loading} error={error}>
      <GridList<IProduct>
        records={records}
        renderItem={(record) => <Product {...record} />}
      />
    </Loading>
  )
}

export default Products
