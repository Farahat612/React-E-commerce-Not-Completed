// custom hook
import useProducts from '@hooksuseProducts'

// components
import { Product } from '@components/eCommerce'
import { Loading } from '@componentsfeedback'
import { GridList, Heading } from '@componentsshared'
// types
import { IProduct } from '@customTypesproduct'

const Products = () => {
  // Getting the products
  const { loading, error, productsFullInfo, prefix } = useProducts()

  // Displaying the products
  return (
    <>
      <Heading title={`${prefix?.toUpperCase()} Products`} />
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
