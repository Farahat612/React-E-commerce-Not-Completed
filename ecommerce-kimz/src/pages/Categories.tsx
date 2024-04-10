import { Container, Row, Col } from 'react-bootstrap'
import { Category } from '@components/eCommerce'

// Redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCategories } from '@store/categories/categoriesSlice'
import { useEffect } from 'react'

const Categories = () => {
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  )

  useEffect(() => {
    if (!records.length) {
      dispatch(getCategories())
    }
  }, [dispatch, records])
  return (
    <Container>
      <Row>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
        <Col xs={6} md={3} className='d-flex justify-content-center mb-5 mt-2'>
          <Category />
        </Col>
      </Row>
    </Container>
  )
}

export default Categories
