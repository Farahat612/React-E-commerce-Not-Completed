import { Row, Col } from 'react-bootstrap'
import { LottieHandler } from '@components/feedback/index'

// defining types of props
type GridListProps<T> = {
  records: T[]
  renderItem: (record: T) => JSX.Element
  emptyMessage?: string
}

// defining functional component
const GridList = <T extends { id?: number }>({
  records,
  renderItem,
  emptyMessage,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={3}
          key={record.id}
          className='d-flex justify-content-center mb-5 mt-2'
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <LottieHandler type='empty' message={emptyMessage} />
    )
  return <Row>{renderList}</Row>
}

export default GridList
