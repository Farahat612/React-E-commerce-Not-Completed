import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
// Layouts
import { MainLayout } from '@layouts/'
// Pages
import { Home, About, Categories, Products } from '@pages/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/products/:prefix' element={<Products />} />
      </Routes>
    </MainLayout>
  </Router>
)
