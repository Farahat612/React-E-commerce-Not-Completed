// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability'
// zod
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, signUpType } from '@validations/signUpSchema'
// bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'
// components
import { Heading } from '@components/shared'
import { Input } from '@components/form'

const Register = () => {
  // Destructuring useForm into register
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>(
    // zodResolver to validate form inputs
    {
      mode: 'onBlur',
      resolver: zodResolver(signUpSchema),
    }
  )

  // submitForm function
  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data)
  }

  // Destrcuturing useCheckEmailAvailability
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability()

  // onBlur function
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email')
    const value = e.target.value
    const { isDirty, invalid } = getFieldState('email')

    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value)
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability()
    }
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
              error={errors.firstName?.message}
            />

            <Input
              label='Last Name'
              name='lastName'
              register={register}
              error={errors.lastName?.message}
            />

            <Input
              label='Email'
              name='email'
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
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
              error={errors.password?.message}
            />

            <Input
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              register={register}
              error={errors.confirmPassword?.message}
            />

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
