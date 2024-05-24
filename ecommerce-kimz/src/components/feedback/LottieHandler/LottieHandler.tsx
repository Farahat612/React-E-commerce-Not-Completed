// lottie-react
import Lottie from 'lottie-react'
// import notFound from '@assets/lotties/notFound.json'
// import empty from '@assets/lotties/empty.json'
// import loading from '@assets/lotties/loading.json'
// import error from '@assets/lotties/error.json'
// lottie files
import { notFound, empty, loading, error, success } from '@assets/lotties/index'

// defining cases of lottie files
const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  success,
}

// defining type of props
type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap
  message?: string
  className?: string
}

// LottieHandler component
const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
  // getting lottie file by type
  const lottie = lottieFilesMap[type]
  // setting message style
  const messageStyle =
    type === 'error'
      ? { fontSize: '19px', color: 'red' }
      : { fontSize: '19px', marginTop: '30px' }

  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: '250px' }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler
