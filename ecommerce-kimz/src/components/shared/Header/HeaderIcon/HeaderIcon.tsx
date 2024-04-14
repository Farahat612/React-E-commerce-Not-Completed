import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// redux

import styles from './styles.module.css'
const { container, totalNum, pumpAnimate, iconWrapper } = styles

// Defining types for the props
type HeaderIconProps = {
  totalQuantity: number
  svgIcon: React.ReactNode
  to: string
  title?: string
}

const HeaderIcon = ({ totalQuantity, svgIcon, title, to }: HeaderIconProps) => {
  // state for animation
  const [isAnimate, setIsAnimate] = useState(false)
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ''}`

  // useEffect to animate the quantity
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

  // initializing the navigate hook
  const navigate = useNavigate()

  return (
    <div className={container} onClick={() => navigate(`/${to}`)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}> {totalQuantity} </div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  )
}

export default HeaderIcon
