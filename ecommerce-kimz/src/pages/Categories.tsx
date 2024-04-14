// Custom hooks
import useCategories from '@hooks/useCategories'
// Components
import { Category } from '@components/eCommerce/index'
import { Loading } from '@components/feedback'
import { GridList, Heading } from '@components/shared/index'
// Types
import { ICategory } from '@customTypes/category'

const Categories = () => {
  // Getting the categories
  const { loading, error, categories } = useCategories()

  // displaying the categories
  return (
    <>
      <Heading title='Categories' />
      <Loading loading={loading} error={error}>
        <GridList<ICategory>
          records={categories}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  )
}

export default Categories
