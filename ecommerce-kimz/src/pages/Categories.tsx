// Custom hooks
import useCategories from '@hooksuseCategories'
// Components
import { Category } from '@components/eCommerce'
import { Loading } from '@componentsfeedback'
import { GridList, Heading } from '@componentsshared'
// Types
import { ICategory } from '@customTypescategory'

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
