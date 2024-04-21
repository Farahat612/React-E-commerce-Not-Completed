// react
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form'
// zod
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, signInType } from '@validations/signInSchema'
// redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authLogin, resetUI } from '@store/auth/authSlice'

const useLogin = () => {
  // Destructuring useForm into register
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
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

  return {
    accessToken,
    loading,
    error,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  }
}

export default useLogin
