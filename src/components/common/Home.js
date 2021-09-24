import React from 'react'
import { Container } from 'react-bootstrap'

function Home() {
  
  return (
    <>
      <Container fluid className="no-pad">
        <div className="home-wrap off-white">
          <div className="title-wrap">
            <p className="big-title"><strong>Home Game Tracker</strong></p>
            <p className="tagline">Poker statistics at the click of a button</p>
          </div>
          <div className="dash-img"></div>
        </div>
      </Container>
      <section className="tag-wrap">
        <p className="info-tagline">Seperate the winners from the losers - start logging your games today!</p>
      </section>
    </>
  )
}

export default Home