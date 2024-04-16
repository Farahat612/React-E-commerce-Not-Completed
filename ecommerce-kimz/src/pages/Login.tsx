// bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'

const Login = () => {
  return (
    <>
      <Heading title='User Login' />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
              />
            </Form.Group>

            <Button variant='info' type='submit' style={{ color: 'white' }}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login
