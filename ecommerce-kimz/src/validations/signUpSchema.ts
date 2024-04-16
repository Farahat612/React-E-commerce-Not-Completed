import { z } from 'zod'

// Defining signup schema
const signUpSchema = z
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
type signUpType = z.infer<typeof signUpSchema>

export { signUpSchema, type signUpType }
