import { Link } from 'react-router-dom'

import styles from './styles.module.css'
const { category, categoryImg, categoryTitle } = styles

// defining types for the props
interface ICategoryProps {
  title: string
  img: string
  prefix: string
}

const Category = ({ title, img, prefix }: ICategoryProps) => {
  return (
    <div className={category}>
      <Link to={`/categories/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  )
}

export default Category
