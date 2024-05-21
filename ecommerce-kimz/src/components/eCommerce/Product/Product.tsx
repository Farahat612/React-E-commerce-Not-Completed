import { Button, Spinner, Modal } from 'react-bootstrap'
import styles from './styles.module.css'
const { maximumNotice, wishlistBtn } = styles
// importing types
import { IProduct } from '@types'
// redux
import { useAppDispatch } from '@store/hooks'
import { addToCart } from '@store/cart/cartSlice'
import { likeToggle } from '@store/wishlist/wishlistSlice'
// react hooks
import { useEffect, useState, memo } from 'react'
// Icons
import Heart from '@assets/svg/heart.svg?react'
import HeartFill from '@assets/svg/heart-fill.svg?react'

import ProductInfo from '../ProductInfo/ProductInfo'

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: IProduct) => {
    // console.log('Product rendered')
    // initializing the dispatch
    const dispatch = useAppDispatch()

    // Tracking the maximum quantity of the product
    const currentRemainingQuantity = max - (quantity ?? 0)
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

    // state for showing the login modal
    const [showModal, setShowModal] = useState(false)
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
      if (isAuthenticated) {
        // preventing the user from clicking the button while the request is in progress
        if (isloading) {
          return
        }
        setIsLoading(true)
        dispatch(likeToggle(id))
          .finally(() => setIsLoading(false))
          .catch(() => setIsLoading(false))
      } else {
        setShowModal(true)
      }
    }

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo
          title={title}
          price={price}
          img={img}
          direction='row'
        >
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isloading ? (
              <Spinner animation='border' size='sm' variant='warning' />
            ) : isLiked ? (
              <HeartFill />
            ) : (
              <Heart />
            )}
          </div>
          
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? 'You reach to the limit'
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant='info'
            style={{ color: 'white', width: '100%'}}
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
        </ProductInfo>
      </>
    )
  }
)

export default Product
