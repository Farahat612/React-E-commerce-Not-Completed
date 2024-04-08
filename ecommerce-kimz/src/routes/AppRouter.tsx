import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
} from '@pages/'

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/products/:prefix' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default AppRouter
