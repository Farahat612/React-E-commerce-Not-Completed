import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from 'react-router-dom'
// Layouts
import { MainLayout } from '@layouts/'
// Pages
import {
  Home,
  About,
  Categories,
  Products,
  Login,
  Register,
  NotFound,
  Cart,
} from '@pages/'

// Products route guard -- > Validates the category prefix in client side
const ProductsWrapper = () => {
  const { prefix } = useParams()
  const navigate = useNavigate()
  // Check if prefix is a string and contains only lowercase letters
  useEffect(() => {
    if (typeof prefix !== 'string' || !/^[a-z]+$/.test(prefix)) {
      navigate('/notFound', {
        state: { message: 'The category you are looking for can not be found' },
      })
    }
  }, [prefix, navigate])

  // Validating again outside of useEffect because React still needs to know what to render for this component in the current render cycle
  if (typeof prefix !== 'string' || !/^[a-z]+$/.test(prefix)) {
    return null
  }

  return <Products />
}

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/categories' element={<Categories />} />
          <Route
            path='categories/products/:prefix'
            element={<ProductsWrapper />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default AppRouter
