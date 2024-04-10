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

  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className='d-flex justify-content-center mb-5 mt-2'
          >
            <Category {...record} />
          </Col>
        ))
      : 'Sorry, no caetgories available at the moment.'

  // if the loading state is pending
  if (loading === 'pending') {
    return 'Loading...'
  }

  // if there is an error
  if (error) {
    return `An error occurred: ${error}`
  }

  // displaying the categories
  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  )
}

export default Categories
