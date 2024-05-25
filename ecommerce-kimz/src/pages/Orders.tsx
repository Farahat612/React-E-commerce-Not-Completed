import useOrders from '@hooks/useOrders'

import { ProductInfo } from '@components/eCommerce'
import { Heading } from '@components/shared'
import { Modal, Table } from 'react-bootstrap'

const Orders = () => {
  const {
    ordersList,
    showModal,
    handleCloseModal,
    viewDetailsHandler,
    selectedProduct,
  } = useOrders()
  return (
    <>
      <Heading title='My Order' />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((el) => (
            <tr key={el.id}>
              <td>#{el.id}</td>
              <td>
                {el.items.length} Item(s){' / '}
                <span
                  onClick={() => viewDetailsHandler(el.id)}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Product Details
                </span>
              </td>
              <td>{el.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              style={{ marginBottom: '10px' }}
              quantity={el.quantity}
              direction='column'
            />
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Orders
