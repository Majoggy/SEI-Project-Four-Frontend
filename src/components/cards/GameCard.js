import React from 'react'
import { Button } from 'react-bootstrap'
import { deleteGame } from '../../lib/api'
import { useHistory } from 'react-router-dom'

function GameCard({ game }) {
  const [clicked, setClicked] = React.useState(false)
  const history = useHistory()
  

  const preDelete = () => {
    setClicked(true)
  }
  
  const handleDelete = async e => {
    e.preventDefault()
    try {
      await deleteGame(game.id)
      history.push('/dashboard')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="game-box" key={game.id}>
      <h3>Game {game.id} aka {game.name}</h3>
      <h4>First Place: {game.firstPlace.name}</h4>
      <h4>Runner Up: {game.secondPlace.name}</h4>
      <h4>Number of Players: {game.numberOfPlayers}</h4>
      <h4>Prize Pool: £{game.numberOfPlayers * game.buyIn}</h4>
      <Button variant="dark">Edit Game</Button>
      {!clicked && <Button variant="danger" onClick={preDelete}>Delete Game</Button>}
      {clicked && <Button variant="warning" onClick={handleDelete}>Delete Game</Button>}
    </div>
  )
}

export default GameCard