// react imports
import { useEffect } from 'react'
// react-router-dom imports
import { NavLink } from 'react-router-dom'
// redux imports
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authLogout } from '@store/auth/authSlice'
import { getWishlist } from '@store/wishlist/wishlistSlice'
// bootstrap imports
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// components
import HeaderRightBar from './HeaderRightBar/HeaderRightBar'
// styles
import styles from './styles.module.css'
const { headerContainer, headerLogo } = styles

const Header = () => {
  // initializing the dispatch
  const dispatch = useAppDispatch()
  // getting the auth state
  const { accessToken, user } = useAppSelector((state) => state.auth)

  // getting the wishlist
  useEffect(() => {
    if (accessToken) {
      dispatch(getWishlist('productsIds'))
    }
  }, [dispatch, accessToken])

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <Badge bg='light' text='dark'>
            HEXA
          </Badge>
          <Badge bg='info'>SHOP</Badge>
        </h1>
        <HeaderRightBar />
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
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to='login'>
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to='register'>
                    Register
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item as={NavLink} to='profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to='profile/orders' end>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to='/'
                    onClick={() => dispatch(authLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
