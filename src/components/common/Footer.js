import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Footer() {
  return (
    <Navbar className="footer footer-border" bg="light" expand="lg">
      <Container className='footer-wrap'>
        <Navbar.Text className="bold">
          Footer
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer