// redux
import { useAppSelector } from '@storehooks'
import { getCartTotalQuantitySelector } from '@storecart/cartSlice'

// components
import HeaderIcon from '../HeaderIcon/HeaderIcon'
import WishListIcon from '@assetssvg/wishlist.svg?react'
import CartIcon from '@assetssvg/cart.svg?react'

// styles
import styles from './styles.module.css'
const { headerRightBar } = styles

const HeaderRightBar = () => {
  // wishlist total quantity
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  )
  // cart total quantity
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector)

  return (
    <div className={headerRightBar}>
      <HeaderIcon
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishListIcon title='wishlist' />}
        title='Wishlist'
        to='wishlist'
      />
      <HeaderIcon
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title='cart' />}
        title='Cart'
        to='cart'
      />
    </div>
  )
}

export default HeaderRightBar
