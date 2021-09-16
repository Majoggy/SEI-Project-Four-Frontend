import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { removeToken } from '../../lib/auth'
import { isAuthenticated } from '../../lib/auth'

function NavigationBar() {
  const history = useHistory()
  const isAuth = isAuthenticated()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  useLocation()

  return (
    <Navbar className="nav-bar-border light-red" expand="lg">
      <Container className="light-red">
        {!isAuth &&
        <>
          <Navbar.Brand className="bold" href="/"><img src="https://i.ibb.co/CnfjVTj/aces-icon.png" className="aces-icon"alt="aces-icon"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </>
        }
        {isAuth &&
        <>
          <Navbar.Brand className="bold" href="/dashboard"><img src="https://i.ibb.co/CnfjVTj/aces-icon.png" className="aces-icon"alt="aces-icon"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </>
        }

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {!isAuth &&
          <Nav>
            <Nav.Link className="bold" href="/login">Log In</Nav.Link>
            <Nav.Link className="bold" href="/register">Register</Nav.Link>
          </Nav>
          }
          {isAuth &&
            <Nav>
              <Nav.Link className="bold" href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar