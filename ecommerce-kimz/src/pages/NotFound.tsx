import { Link } from 'react-router-dom'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'
const { wrapper, left, right, linkStyle } = styles
// assets
import ImgSvg from '@assets/svg/404.svg'
import Button from 'react-bootstrap/Button'

const NotFound = () => {
  return (
    <div className={wrapper}>
      <div className={left}>
        <h1> I have bad news for you</h1>
        <p>
          The page you are looking for might be removed or is temporarily
          unavailable.
        </p>
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
