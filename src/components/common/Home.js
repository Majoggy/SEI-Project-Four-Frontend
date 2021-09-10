import React from 'react'
import { Container } from 'react-bootstrap'

function Home() {
  
  return (
    <Container fluid className="no-pad">
      <div className="home-wrap">
        <div className="title-wrap">
          <h1>my home game tracker</h1>
          <h3>poker statistics at the click of a button</h3>
        </div>
        <div className="info-wrap">
          <div className="promo-text-box"></div>
          <div className="promo-text-box"></div>
        </div>
      </div>
    </Container>
    
  )

}

export default Home