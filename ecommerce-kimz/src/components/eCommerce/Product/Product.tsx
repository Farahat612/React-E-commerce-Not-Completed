import { Button } from 'react-bootstrap'
import styles from './styles.module.css'
const { product, productImg } = styles
// importing types
import { IProduct } from '@customTypes/product'

const Product = ({ title, price, img }: IProduct) => {
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <Button variant='info' style={{ color: 'white' }}>
        Add to cart
      </Button>
    </div>
  )
}

export default Product
