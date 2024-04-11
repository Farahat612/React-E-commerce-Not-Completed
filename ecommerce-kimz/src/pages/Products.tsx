import { Container, Row, Col } from 'react-bootstrap'
import { Product } from '@components/eCommerce'
// importing redux hooks
import { useAppDispatch, useAppSelector } from '@storehooks'
// importing the getProducts thunk and the productsCleanUp action
import { getProducts, productsCleanUp } from '@store/products/productsSlice'
// importing the useEffect hook
import { useEffect } from 'react'
// importing useParams
import { useParams } from 'react-router-dom'

const Products = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts(params.prefix as string))
    return () => {
      dispatch(productsCleanUp())
    }
  }, [dispatch, params])

  // Handling the loading state
  if (loading === 'pending') {
    return <h1>Loading...</h1>
  }

  // Handling the error state
  if (loading === 'failed') {
    return <h1>{error}</h1>
  }

  // Displaying the products
  return (
    <Container>
      <Row>
        {records.map((product) => (
          <Col
            xs={3}
            key={product.id}
            className='d-flex justify-content-center mb-5 mt-2'
          >
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Products
