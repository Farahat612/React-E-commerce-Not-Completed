// react
import { Suspense } from 'react'
// LottieHandler
import LottieHandler from '../LottieHandler/LottieHandler'

// PageSuspenseFallback
const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type='loading' message='loading please wait..' />
      }
    >
      {children}
    </Suspense>
  )
}

export default PageSuspenseFallback
