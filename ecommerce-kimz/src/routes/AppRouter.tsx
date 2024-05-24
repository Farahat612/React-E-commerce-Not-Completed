// react hooks
import { Suspense, lazy } from 'react'
// react router dom
import NotFound from '@pages/NotFound'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
// Layouts
const MainLayout = lazy(() => import('@layouts/Main/MainLayout'))
const ProfileLayout = lazy(() => import('@layouts/Profile/ProfileLayout'))
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
const Profile = lazy(() => import('@pages/Profile'))
const Orders = lazy(() => import('@pages/Orders'))
// Components
import ProtectedRoute from '@components/Auth/ProtectedRoute'
import { LottieHandler, PageSuspenseFallback } from '@components/feedback/index'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: '10%' }}>
            <LottieHandler type='loading' message='Loading please wait...' />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: '/cart',
        element: (
          <PageSuspenseFallback>
            <Cart />
          </PageSuspenseFallback>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <WishList />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: '/categories',
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: '/categories/products/:prefix',
        element: (
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== 'string' ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response('Bad Request', {
              statusText: 'Category not found',
              status: 400,
            })
          }
          return true
        },
      },
      {
        path: 'about',
        element: (
          <PageSuspenseFallback>
            <About />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'login',
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'register',
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <ProfileLayout />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <Profile />
              </PageSuspenseFallback>
            ),
          },
          {
            path: 'orders',
            element: (
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
