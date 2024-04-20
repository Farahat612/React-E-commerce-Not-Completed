// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
// zod
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, signInType } from '@validations/signInSchema'
// bootstrap
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'
import { Input } from '@components/form'
// react
import { useEffect } from 'react'
// react-router-dom
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
// redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authLogin, resetUI } from '@store/auth/authSlice'

const Login = () => {
  // Destructuring useForm into register
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>(
    // zodResolver to validate form inputs
    {
      mode: 'onBlur',
      resolver: zodResolver(signInSchema),
    }
  )

  // initialize dispatch
  const dispatch = useAppDispatch()
  // initialize navigate
  const navigate = useNavigate()
  // initialize searchParams
  const [searchParams, setSearchParams] = useSearchParams()
  // access auth state
  const { accessToken, loading, error } = useAppSelector((state) => state.auth)

  // submitForm function
  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParams.get('message')) {
      setSearchParams('')
    }
    dispatch(authLogin(data))
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  // useEffect to reset UI
  useEffect(() => {
    return () => {
      dispatch(resetUI())
    }
  }, [dispatch])

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
              error={errors.email?.message}
            />

            <Input
              label='Password'
              name='password'
              type='password'
              register={register}
              error={errors.password?.message}
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
