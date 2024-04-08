import { Container } from 'react-bootstrap'
import { Header, Footer } from '../../components/shared'
import styles from './styles.module.css'
const { container } = styles

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <Footer />
    </Container>
  )
}

export default MainLayout
