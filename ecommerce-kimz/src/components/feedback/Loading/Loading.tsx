// skeletons
import {
  ProductSkeleton,
  CategorySkeleton,
  CartSkeleton,
} from '@components/feedback/skeletons/skeletons'

// importing TLoading customType
import { TLoading } from '@types'

// importing LottieHandler
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler'

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
    const message = `Couldn't find any ${type} data. Please try again later.
    Error: ${error as string}`
    return <LottieHandler type='error' message={message} />
  }
  return <>{children}</>
}

export default Loading
