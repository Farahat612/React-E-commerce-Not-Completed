// custom hook
import useWishlist from '@hooksuseWishlist'

// components
import { Heading, GridList } from '@componentsshared'
import { Product } from '@componentseCommerce'
import { Loading } from '@componentsfeedback'
// types

import { IProduct } from '@customTypesproduct'

const WishList = () => {
  // use the custom hook
  const { records, loading, error } = useWishlist()

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
