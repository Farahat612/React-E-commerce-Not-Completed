import { Button } from 'react-bootstrap'
import styles from './styles.module.css'
const { product, productImg } = styles
// importing types
import { IProduct } from '@customTypes/product'
// redux
import { useAppDispatch } from '@storehooks'
import { addToCart } from '@storecart/cartSlice'

const Product = ({ id, title, price, img }: IProduct) => {
  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    dispatch(addToCart(id))
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
      >
        Add to cart
      </Button>
    </div>
  )
}

export default Product
