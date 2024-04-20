import { isAxiosError } from 'axios'

const axiosErrorHandler = (error: unknown, message?: string) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message
  } else {
    return message
  }
}

export default axiosErrorHandler
