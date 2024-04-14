// react hooks
import { useEffect } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getCategories,
  categoriesCleanUp,
} from '@store/categories/categoriesSlice'

// Defining the useCategories hook
const useCategories = () => {
  // redux
  const dispatch = useAppDispatch()
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  )

  // Fetching the categories
  useEffect(() => {
    const promise = dispatch(getCategories())

    return () => {
      // Cleaning up the categories slice
      dispatch(categoriesCleanUp())
      // Cancelling the request
      promise.abort()
    }
  }, [dispatch])

  return { loading, error, categories: records }
}

// Exporting the useCategories hook
export default useCategories
