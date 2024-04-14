import ReactDOM from 'react-dom/client'
// AppRouter
import AppRouter from '@routes/AppRouter'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import '@styles/global.css'
// redux
import { Provider } from 'react-redux'
import { store, persistor } from '@store/store'
// redux persist
import { PersistGate } from 'redux-persist/integration/react'
// axios
import '@services/axios-global'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
)
