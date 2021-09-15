import React from 'react'
import { Button } from 'react-bootstrap'
import { deleteGame } from '../../lib/api'
import { Link } from 'react-router-dom'
import { Modal, Container, Row, Col } from 'react-bootstrap'


function GameCard({ game, refetchData }) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDelete = async e => {
    e.preventDefault()
    try {
      await deleteGame(game.id)
      await refetchData()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="game-box" key={game.id}>
        <div className="row">
          <div className="col-sm-4 center-flex"><h5>{game.date}</h5></div>
          <div className="col-sm-4 center-flex"><h6>£{game.numberOfPlayers * game.buyIn}</h6></div>
          <div className="col-sm-4 center-flex"><h6>{game.firstPlace.name}</h6></div>
          <div className="col-sm-12 center-flex">
            <Button variant="secondary" onClick={handleShow} className="btn-sm button-border">View Game</Button>
            <Link to={{ pathname: '/editgame', state: { game: game.id } }}>
              <Button variant="warning" className="btn-sm edit-button button-border">Edit Game</Button>
            </Link>
            <Button variant="danger" className="btn-sm button-border" onClick={handleDelete}>Delete Game</Button>
          </div>
        </div>
      </div>
      
      <Modal show={show} size="lg"
        key={game.name} centered>
        <Modal.Header>
          <Modal.Title class="text-capitalize">{game.name} ({game.date})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={6}>
                <p>Winner: {game.firstPlace.name} (£{game.prizeForFirst})</p>
                <p>Runner up: {game.secondPlace.name} (£{game.prizeForSecond})</p>
                <p>Third: {game.thirdPlace.name} (£{game.prizeForThird})</p>
                {game.fourthPlace && <p>Fourth: {game.fourthPlace.name}</p>}
                {game.fifthPlace && <p>Fifth: {game.fifthPlace.name}</p>}
              </Col>
              <Col xs={6} md={6}>
                {game.sixthPlace && <p>Sixth: {game.sixthPlace.name}</p>}
                {game.seventhPlace && <p>Seventh: {game.seventhPlace.name}</p>}
                {game.eighthPlace && <p>Eighth: {game.eighthPlace.name}</p>}
                {game.ninthPlace && <p>Ninth: {game.ninthPlace.name}</p>}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Col xs={12} md={10}>
            <p>Buy In: £{game.buyIn}</p>
            <p>Prize Pool: £{game.prizeForFirst + game.prizeForSecond + game.prizeForThird}</p>
          </Col>
          <Button variant="dark" onClick={handleClose}>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GameCard