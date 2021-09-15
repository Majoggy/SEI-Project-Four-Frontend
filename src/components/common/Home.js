import React from 'react'
import { Container } from 'react-bootstrap'

function Home() {
  
  return (
    <Container fluid className="no-pad">
      <div className="home-wrap misc-grey">
        <div className="title-wrap">
          <p style={{ fontSize: '50px' }}><strong>my home game tracker</strong></p>
          <p style={{ fontSize: '40px' }}>poker statistics at the click of a button</p>
        </div>
        <div className="info-wrap">
          <div className="promo-text-box light-grey"></div>
          <div className="promo-text-box light-grey"></div>
        </div>
      </div>
    </Container>
    
  )

}

export default Home