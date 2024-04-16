// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
// zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'

// Defining signup schema
const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name is too short' }),
    lastName: z.string().min(2, { message: 'Last name is too short' }),
    email: z.string().min(2, { message: 'Email address is required!' }).email(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          'Password must contain at least 1 capital character, 1 special character, and be at least 8 characters long',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Defining form inputs type
type TFormInputs = z.infer<typeof signupSchema>

const Register = () => {
  // Destructuring useForm into register
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>(
    // zodResolver to validate form inputs
    {
      mode: 'onBlur',
      resolver: zodResolver(signupSchema),
    }
  )

  // submitForm function
  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Heading title='User Registration' />
      <Row className='my-5'>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                {...register('firstName')}
                isInvalid={!!errors.firstName?.message}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                {...register('lastName')}
                isInvalid={!!errors.lastName?.message}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                {...register('email')}
                isInvalid={!!errors.email?.message}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email?.message}
              </Form.Control.Feedback>
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                {...register('password')}
                isInvalid={!!errors.password?.message}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword?.message}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
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

export default Register
