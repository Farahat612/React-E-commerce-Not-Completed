// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
// zod
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, signInType } from '@validations/signInSchema'
// bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'
import { Input } from '@components/form'

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

  // submitForm function
  const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Heading title='User Login' />
      <Row className='my-5'>
        <Col md={{ span: 6, offset: 3 }}>
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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login
