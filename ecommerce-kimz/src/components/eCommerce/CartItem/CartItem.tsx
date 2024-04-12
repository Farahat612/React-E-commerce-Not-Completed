// styles
import styles from './styles.module.css'
const { cartItem, product, productImg, productInfo } = styles
// Bootstrap Components
import { Button } from 'react-bootstrap'

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
    </div>
  )
}

export default CartItem
