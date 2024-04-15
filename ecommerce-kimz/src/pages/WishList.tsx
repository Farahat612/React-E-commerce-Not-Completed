// custom hook
import useWishlist from '@hooks/useWishlist'

// components
import { Heading, GridList } from '@components/shared/index'
import { Product } from '@components/eCommerce/index'
import { Loading } from '@components/feedback/index'
// types

import { IProduct } from '@types'

const WishList = () => {
  // use the custom hook
  const { records, loading, error } = useWishlist()

  return (
    <>
      <Heading title='Your Wishlist' />
      <Loading loading={loading} error={error} type='product'>
        <GridList<IProduct>
          records={records}
          emptyMessage='Your wishlist is empty'
          renderItem={(item) => <Product {...item} />}
        />
      </Loading>
    </>
  )
}

export default WishList
