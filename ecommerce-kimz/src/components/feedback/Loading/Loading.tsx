// skeletons
import {
  ProductSkeleton,
  CategorySkeleton,
  CartSkeleton,
} from '@components/feedback/skeletons/skeletons'

// importing TLoading customType
import { TLoading } from '@types'

// defining cases of skeletons
const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
}

// defining type of props
interface LoadingProps {
  loading: TLoading
  error: null | string
  children?: React.ReactNode
  type?: keyof typeof skeletonsTypes 
}

const Loading = ({
  loading,
  error,
  children,
  type = 'category',
}: LoadingProps) => {
  if (loading == 'pending') {
    const Skeleton = skeletonsTypes[type]
    return <Skeleton />
  }
  if (error) {
    return <h1>failed ... {error}</h1>
  }
  return <>{children}</>
}

export default Loading
