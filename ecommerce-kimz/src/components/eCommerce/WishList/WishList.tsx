import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WishListIcon from '@assets/svg/wishlist.svg?react'

// redux
import { useAppSelector } from '@storehooks'

import styles from './styles.module.css'
const { container, totalNum, pumpAnimate, iconWrapper } = styles

const WishList = () => {
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId.length)

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
  const handleIconClick = () => {
    navigate('/wishlist')
  }

  return (
    <div className={container} onClick={handleIconClick}>
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
