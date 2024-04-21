// custom hook
import useLogin from '@hooks/useLogin'
// bootstrap
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'
import { Input } from '@components/form'

// react-router-dom
import { Navigate } from 'react-router-dom'

const Login = () => {
  // custom hook
  const {
    accessToken,
    loading,
    error,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  } = useLogin()

  // navigate to home if user is already logged in [protecting login page]
  if (accessToken) {
    return <Navigate to='/' />
  }

  // return statement
  return (
    <>
      <Heading title='User Login' />
      <Row className='my-5'>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get('message') === 'login_required' && (
            <Alert variant='success'>
              You need to login to view this content
            </Alert>
          )}

          {searchParams.get('message') === 'account_created' && (
            <Alert variant='success'>
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label='Email'
              name='email'
              register={register}
              error={formErrors.email?.message}
            />

            <Input
              label='Password'
              name='password'
              type='password'
              register={register}
              error={formErrors.password?.message}
            />

            <Button variant='info' type='submit' style={{ color: 'white' }}>
              {loading === 'pending' ? (
                <>
                  <Spinner animation='border' size='sm'></Spinner> Loading...
                </>
              ) : (
                'Submit'
              )}
            </Button>
            {error && (
              <p style={{ color: '#DC3545', marginTop: '10px' }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login
