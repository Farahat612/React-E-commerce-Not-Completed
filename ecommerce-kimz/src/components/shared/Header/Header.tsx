import { NavLink } from 'react-router-dom'
import { Cart } from '@components/eCommerce'
import styles from './styles.module.css'
const { headerContainer, headerLogo } = styles
import { Badge, Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <Badge bg='light' text='dark'>
            HEXA
          </Badge>
          <Badge bg='info'>SHOP</Badge>
        </h1>
        <Cart />
      </div>

      <Navbar
        expand='lg'
        className='bg-body-tertiary'
        bg='dark'
        data-bs-theme='dark'
      >
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={NavLink} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='categories'>
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to='about'>
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to='login'>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to='register'>
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
