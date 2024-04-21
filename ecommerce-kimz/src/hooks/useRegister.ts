// Desc: useRegister hook for Register component
// react
import { useEffect } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authRegister, resetUI } from '@store/auth/authSlice'
// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability'
// zod
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, signUpType } from '@validations/signUpSchema'

const useRegister = () => {
  // Destructuring useForm into register
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<signUpType>(
    // zodResolver to validate form inputs
    {
      mode: 'onBlur',
      resolver: zodResolver(signUpSchema),
    }
  )

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

  // initialize dispatch
  const dispatch = useAppDispatch()
  // initialize navigate
  const navigate = useNavigate()
  // accessing auth state
  const { loading, error, accessToken } = useAppSelector((state) => state.auth)

  // submitForm function
  const submitForm: SubmitHandler<signUpType> = (data) => {
    const { firstName, lastName, email, password } = data
    dispatch(authRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/login?message=account_created')
      })
  }

  // useEffect to reset UI
  useEffect(() => {
    return () => {
      dispatch(resetUI())
    }
  }, [dispatch])
  return {
    loading,
    error,
    accessToken,
    formErrors,
    emailAvailabilityStatus,
    register,
    handleSubmit,
    submitForm,
    emailOnBlurHandler,
  }
}

export default useRegister
