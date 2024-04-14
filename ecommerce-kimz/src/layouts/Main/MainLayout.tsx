import { Container } from 'react-bootstrap'
import { Header, Footer } from '@components/shared/index'
import styles from './styles.module.css'
const { container, wrapper } = styles

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>{children}</div>
      <Footer />
    </Container>
  )
}

export default MainLayout
