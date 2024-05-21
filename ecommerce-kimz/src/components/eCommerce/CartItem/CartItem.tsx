// styles
import styles from './styles.module.css'
const { cartItem, cartItemSelection } = styles
// Bootstrap Components
import { Button, Form } from 'react-bootstrap'
// Types
import { IProduct } from '@types'
// react imports
import { memo } from 'react'
import ProductInfo from '../ProductInfo/ProductInfo'

// Defining the props type
type CartItemProps = IProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void
  removeItemHandler: (id: number) => void
}

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    // render option list
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        )
      })

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value
      changeQuantityHandler(id, quantity)
    }

    return (
      <div className={cartItem}>
        <ProductInfo
          title={title}
          price={price}
          img={img}
          direction='column'
          // style={{ width: '100%' }}
        >
          <Button
            variant='secondary'
            style={{ color: 'white', width: '100px' }}
            className='mt-auto'
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className='d-block mb-1'>Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    )
  }
)

export default CartItem
