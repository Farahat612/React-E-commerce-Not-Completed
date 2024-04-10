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

  // if the loading state is pending
  if (loading === 'pending') {
    return 'Loading...'
  }

  // if there is an error
  if (error) {
    return `No categories found. Error: ${error}`
  }

  console.log(records)

  // displaying the categories
  return (
    <Container>
      <Row>
        {records.map((category) => (
          <Col
            key={category.id}
            xs={3}
            className='d-flex justify-content-center mb-5 mt-2'
          >
            <Category
              title={category.title}
              img={category.img}
              prefix={category.prefix}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Categories
