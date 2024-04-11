import { Row, Col } from 'react-bootstrap'

// defining types of props
type GridListProps<T> = {
  records: T[]
  renderItem: (record: T) => JSX.Element
}

// defining functional component
const GridList = <T extends { id?: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className='d-flex justify-content-center mb-5 mt-2'
          >
            {renderItem(record)}
          </Col>
        ))
      : 'there are no records'
  return <Row>{renderList}</Row>
}

export default GridList
