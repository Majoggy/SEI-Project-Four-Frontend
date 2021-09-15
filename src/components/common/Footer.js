import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Footer() {
  return (
    <Navbar className="footer footer-border light-red py-6"  expand="lg">
      <Container className='footer-wrap'>
        <Navbar.Text className="bold">
        &copy; Christian Baker 2021
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer