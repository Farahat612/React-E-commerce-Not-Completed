/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks
import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
// actions
import { placeOrder } from '@store/orders/ordersSlice'
import { clearCart } from '@store/cart/cartSlice'

// types
import { IProduct } from '@types'
import { Button, Modal, Spinner } from 'react-bootstrap'
// styles
import styles from './styles.module.css'

// Defining the props type
type CartSubTotalProps = {
  products: IProduct[]
  userAccessToken: string | null
}

const CartSubTotal = ({ products, userAccessToken }: CartSubTotalProps) => {
  // Dispatch
  const dispatch = useAppDispatch()
  // states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  // calculate the total price
  const totalPrice = products.reduce((acc, el) => {
    const { price, quantity } = el
    return quantity && typeof quantity === 'number'
      ? acc + price * quantity
      : acc
  }, 0)
  // handlers
  const handlePlaceOrder = () => {
    setLoading(true)
    dispatch(placeOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(clearCart())
        setShowModal(false)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleModal = () => {
    setError(null)
    setShowModal(!showModal)
  }

  return (
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span> {totalPrice.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <>
          <div className={styles.container}>
            <span></span>
            <Button variant='info' className='text-white' onClick={handleModal}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleModal} backdrop='static'>
        <Modal.Header>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal:{' '}
          {totalPrice.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: '#DC3545', marginTop: '10px' }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModal}>
            Close
          </Button>
          <Button
            variant='info'
            onClick={handlePlaceOrder}
            style={{ color: 'white' }}
          >
            {loading ? (
              <>
                <Spinner animation='border' size='sm'></Spinner> Loading...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartSubTotal
