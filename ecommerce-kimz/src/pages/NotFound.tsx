import { Link, useLocation } from 'react-router-dom'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'
const { wrapper, left, right, linkStyle } = styles
// assets
import ImgSvg from '@assets/svg/404.svg'
import Button from 'react-bootstrap/Button'
// lottieHandler
// import LottieHandler from '@components/feedback/LottieHandler/LottieHandler'

const NotFound = () => {
  const location = useLocation()
  const message =
    location.state?.message ||
    'The page you are looking for might be removed or is temporarily unavailable.'

  return (
    <div className={wrapper}>
      <div className={left}>
        <h1> I have bad news for you</h1>
        {/* <LottieHandler type='error'/> */}
        <p>{message}</p>
        <Button variant='info'>
          <Link className={linkStyle} to='/' replace={true}>
            Come Home Babe
          </Link>
        </Button>
      </div>
      <div className={right}>
        <img src={ImgSvg} alt='not found' />
      </div>
    </div>
  )
}

export default NotFound
