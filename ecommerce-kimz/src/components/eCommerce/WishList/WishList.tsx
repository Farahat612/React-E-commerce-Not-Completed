import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WishListIcon from '@assets/svg/wishlist.svg?react'

// redux
// import { useAppSelector } from '@storehooks'
// import { getCartTotalQuantitySelector } from '@storecart/selectors/cartSelectors'

import styles from './styles.module.css'
const { container, totalNum, pumpAnimate, iconWrapper } = styles

const WishList = () => {
  const totalQuantity = 0 //useAppSelector(getCartTotalQuantitySelector)

  const [isAnimate, setIsAnimate] = useState(false)
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ''}`
  useEffect(() => {
    if (!totalQuantity) {
      return
    }
    setIsAnimate(true)

    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 300)

    return () => clearTimeout(debounce)
  }, [totalQuantity])

  const navigate = useNavigate()
  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <div className={container} onClick={handleCartClick}>
      <div className={iconWrapper}>
        <WishListIcon title='wishlist-icon' />
        {totalQuantity > 0 && (
          <div className={quantityStyle}> {totalQuantity} </div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  )
}

export default WishList
