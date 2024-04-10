import ReactDOM from 'react-dom/client'
// AppRouter
import AppRouter from '@routes/AppRouter'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
// redux
import { Provider } from 'react-redux'
import store from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
