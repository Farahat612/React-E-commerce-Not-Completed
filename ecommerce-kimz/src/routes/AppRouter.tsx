// react hooks
import { useEffect, lazy, Suspense } from 'react'
// react router dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from 'react-router-dom'
// Layouts
const MainLayout = lazy(() => import('@layouts/Main/MainLayout'))
//
// Pages
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Categories = lazy(() => import('@pages/Categories'))
const Products = lazy(() => import('@pages/Products'))
const Cart = lazy(() => import('@pages/Cart'))
const WishList = lazy(() => import('@pages/WishList'))
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
import NotFound from '@pages/NotFound'
import { PageSuspenseFallback } from '@components/feedback/index'

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
    <Suspense
      fallback={
        <div className='d-flex flex-column align-items-center'>
          <h5 style={{ marginTop: '20%' }}>Loading please wait...</h5>
        </div>
      }
    >
      <Router>
        <MainLayout>
          <PageSuspenseFallback>
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
              <Route path='/wishlist' element={<WishList />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </PageSuspenseFallback>
        </MainLayout>
      </Router>
    </Suspense>
  )
}

export default AppRouter
