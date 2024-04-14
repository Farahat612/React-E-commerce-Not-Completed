// importing TLoading customType
import { TLoading } from '@customTypes/shared'

// defining type of props
interface LoadingProps {
  loading: TLoading
  error: null | string
  children?: React.ReactNode
}

const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading == 'pending') {
    return <h1>Loading... Please Wait!</h1>
  }
  if (error) {
    return <h1>failed ... {error}</h1>
  }
  return <>{children}</>
}

export default Loading
