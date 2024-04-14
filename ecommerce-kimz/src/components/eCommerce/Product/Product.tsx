import { Button, Spinner } from 'react-bootstrap'
import styles from './styles.module.css'
const { product, productImg, maximumNotice, wishlistBtn } = styles
// importing types
import { IProduct } from '@customTypes/product'
// redux
import { useAppDispatch } from '@store/hooks'
import { addToCart } from '@store/cart/cartSlice'
import { likeToggle } from '@store/wishlist/wishlistSlice'
// react hooks
import { useEffect, useState, memo } from 'react'
// Icons
import Heart from '@assets/svg/heart.svg?react'
import HeartFill from '@assets/svg/heart-fill.svg?react'

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: IProduct) => {
    // console.log('Product rendered')
    // initializing the dispatch
    const dispatch = useAppDispatch()

    // Tracking the maximum quantity of the product
    const currentRemainingQuantity = max - (quantity ?? 0)
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

    // state to disable the addToCart button after adding the product to the cart
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    // useEffect to enable the button after 300ms
    useEffect(() => {
      if (!isBtnDisabled) {
        return
      }
      // debounce
      const debounce = setTimeout(() => {
        setIsBtnDisabled(false)
      }, 300)
      // cleanup
      return () => clearTimeout(debounce)
    }, [isBtnDisabled])

    // state for loading state to manage like and dislike button
    const [isloading, setIsLoading] = useState(false)

    // add to cart handler
    const addToCartHandler = () => {
      dispatch(addToCart(id))
      setIsBtnDisabled(true)
    }

    // like toggle handler
    const likeToggleHandler = () => {
      // preventing the user from clicking the button while the request is in progress
      if (isloading) {
        return
      }
      setIsLoading(true)
      dispatch(likeToggle(id))
        .finally(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
    }

    return (
      <div className={product}>
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isloading ? (
            <Spinner animation='border' size='sm' variant='warning' />
          ) : isLiked ? (
            <HeartFill />
          ) : (
            <Heart />
          )}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        <p className={maximumNotice}>
          {quantityReachedToMax
            ? 'You reach to the limit'
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>
        <Button
          variant='info'
          style={{ color: 'white' }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation='border' size='sm' />
              {''} Loading...
            </>
          ) : (
            'Add to cart'
          )}
        </Button>
      </div>
    )
  }
)

export default Product
