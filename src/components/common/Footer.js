import React from 'react'
import { isAuthenticated } from '../../lib/auth'
import { Container, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function Footer() {
  const isAuth = isAuthenticated()
  useLocation()

  return (
    <Navbar className="footer footer-border light-red py-6"  expand="lg">
      <Container className='footer-wrap'>
        {!isAuth && <Navbar.Text className="bold">
        &copy; Christian Baker 2021
        </Navbar.Text>}
        {isAuth && <Navbar.Text className="bold">
        &copy; My Home Game Tracker
        </Navbar.Text>}
      </Container>
    </Navbar>
  )
}

export default Footer