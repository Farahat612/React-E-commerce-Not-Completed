import ReactDOM from 'react-dom/client'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
// components
import { MainLayout } from '@layouts/'

ReactDOM.createRoot(document.getElementById('root')!).render(<MainLayout />)
