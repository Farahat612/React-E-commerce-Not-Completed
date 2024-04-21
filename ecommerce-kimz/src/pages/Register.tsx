// custom hook
import useRegister from '@hooks/useRegister'
// bootstrap
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'
import { Input } from '@components/form'
//react-router-dom
import { Navigate } from 'react-router-dom'

const Register = () => {
  // custom hook
  const {
    loading,
    error,
    accessToken,
    formErrors,
    emailAvailabilityStatus,
    register,
    handleSubmit,
    submitForm,
    emailOnBlurHandler,
  } = useRegister()

  // Redirect to login if accessToken is available [protecting register page]
  if (accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Heading title='User Registration' />
      <Row className='my-5'>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label='First Name'
              name='firstName'
              register={register}
              error={formErrors.firstName?.message}
            />

            <Input
              label='Last Name'
              name='lastName'
              register={register}
              error={formErrors.lastName?.message}
            />

            <Input
              label='Email'
              name='email'
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === 'notAvailable'
                  ? 'This email is already in use.'
                  : emailAvailabilityStatus === 'failed'
                  ? 'Email Not Valid.'
                  : ''
              }
              formText={
                emailAvailabilityStatus === 'checking'
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : 'We will never share your email with anyone else.'
              }
              success={
                emailAvailabilityStatus === 'available'
                  ? 'This email is available for use.'
                  : ''
              }
              disabled={emailAvailabilityStatus === 'checking' ? true : false}
            />

            <Input
              label='Password'
              name='password'
              type='password'
              register={register}
              error={formErrors.password?.message}
            />

            <Input
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              register={register}
              error={formErrors.confirmPassword?.message}
            />

            <Button
              variant='info'
              type='submit'
              style={{ color: 'white' }}
              disabled={
                emailAvailabilityStatus === 'checking'
                  ? true
                  : false || loading === 'pending'
              }
            >
              {loading === 'pending' ? (
                <>
                  <Spinner animation='border' size='sm'></Spinner> Loading...
                </>
              ) : (
                'Submit'
              )}
            </Button>

            {error && <p className='text-danger mt-3'>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Register
