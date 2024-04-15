// custom hook
import useProducts from '@hooks/useProducts'

// components
import { Product } from '@components/eCommerce/index'
import { Loading } from '@components/feedback/index'
import { GridList, Heading } from '@components/shared/index'
// types
import { IProduct } from '@types'

const Products = () => {
  // Getting the products
  const { loading, error, productsFullInfo, prefix } = useProducts()

  // Displaying the products
  return (
    <>
      <Heading title={`${prefix?.toUpperCase()} Products`} />
      <Loading loading={loading} error={error} type='product'>
        <GridList<IProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}

export default Products
