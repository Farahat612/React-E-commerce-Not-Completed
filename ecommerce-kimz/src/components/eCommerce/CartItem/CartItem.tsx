// styles
import styles from './styles.module.css'
const { cartItem, product, productImg, productInfo, cartItemSelection } = styles
// Bootstrap Components
import { Button, Form } from 'react-bootstrap'

const CartItem = () => {
  const removeItemHandler = (id: string) => {
    console.log('remove item', id)
  }
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img
            src={
              'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={'title'}
          />
        </div>
        <div className={productInfo}>
          <h2>{'test'}</h2>
          <h3>{'30 EGP'} EGP</h3>
          <Button
            variant='secondary'
            style={{ color: 'white', width: '100px' }}
            className='mt-auto'
            onClick={() => removeItemHandler('id here')}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className={cartItemSelection}>
        <span className='d-block mb-1'>Quantity</span>
        <Form.Select aria-label='Default select example'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </Form.Select>
      </div>
    </div>
  )
}

export default CartItem
