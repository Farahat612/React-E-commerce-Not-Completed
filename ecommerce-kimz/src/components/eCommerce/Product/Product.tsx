import { Button, Spinner } from 'react-bootstrap'
import styles from './styles.module.css'
const { product, productImg, maximumNotice } = styles
// importing types
import { IProduct } from '@customTypes/product'
// redux
import { useAppDispatch } from '@storehooks'
import { addToCart } from '@storecart/cartSlice'
// react hooks
import { useEffect, useState, memo } from 'react'

const Product = memo(({ id, title, price, img, max, quantity }: IProduct) => {
  // initializing the dispatch
  const dispatch = useAppDispatch()

  // Tracking the maximum quantity of the product
  const currentRemainingQuantity = max - (quantity ?? 0)
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

  // state to disable the button after adding the product to the cart
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

  // add to cart handler
  const addToCartHandler = () => {
    dispatch(addToCart(id))
    setIsBtnDisabled(true)
    console.log(max, quantity, currentRemainingQuantity)
  }

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{(+price).toFixed(2)} EGP</h3>
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
})

export default Product
