// Components
import { Category } from '@components/eCommerce'
import { Loading } from '@componentsfeedback'
import { GridList, Heading } from '@componentsshared'

// Redux
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getCategories,
  categoriesCleanUp,
} from '@store/categories/categoriesSlice'
import { useEffect } from 'react'
// Types
import { ICategory } from '@customTypescategory'

const Categories = () => {
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  )

  useEffect(() => {
    dispatch(getCategories())
    return () => {
      dispatch(categoriesCleanUp())
    }
  }, [dispatch])

  // displaying the categories
  return (
    <>
      <Heading title='Categories' />
      <Loading loading={loading} error={error}>
        <GridList<ICategory>
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  )
}

export default Categories
