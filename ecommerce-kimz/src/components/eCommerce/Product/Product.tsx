import { Button, Spinner } from 'react-bootstrap'
import styles from './styles.module.css'
const { product, productImg } = styles
// importing types
import { IProduct } from '@customTypes/product'
// redux
import { useAppDispatch } from '@storehooks'
import { addToCart } from '@storecart/cartSlice'
// react hooks
import { useEffect, useState } from 'react'

const Product = ({ id, title, price, img }: IProduct) => {
  // initializing the dispatch
  const dispatch = useAppDispatch()

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
  }

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <Button
        variant='info'
        style={{ color: 'white' }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled}
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

export default Product
