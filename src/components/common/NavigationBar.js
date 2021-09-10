import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { removeToken } from '../../lib/auth'

function NavigationBar({ loggedIn }) {

  const history = useHistory()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <Navbar className="py-5 nav-bar-border" bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="bold" href="/">My Home Game Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {!loggedIn &&
          <Nav>
            <Nav.Link className="bold" href="/login">Log In</Nav.Link>
            <Nav.Link className="bold" href="/register">Register</Nav.Link>
          </Nav>
          }
          {loggedIn &&
            <Nav>
              <Nav.Link className="bold" href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar