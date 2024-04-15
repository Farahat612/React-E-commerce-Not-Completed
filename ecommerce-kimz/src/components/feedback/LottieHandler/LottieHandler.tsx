// lottie-react
import Lottie from 'lottie-react'
// lottie files
import { notFound, empty, loading, error } from '@assets/lotties/index'

// defining cases of lottie files
const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
}

// defining type of props
interface LottieHandlerProps {
  type: keyof typeof lottieFilesMap
  message?: string
  className?: string
}

const lottieStyle = {
  width: '250px',
  // border: '1px solid red',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  // backgroundColor: '#ffffff',
  padding: '0',
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
      <Lottie animationData={lottie} style={lottieStyle} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler
