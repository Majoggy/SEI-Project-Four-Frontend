import React from 'react'

function GameList({ games }) {

  return (
    <>
      {games && games.map(game => 
        <div className="game-box" key={game.id}>
          <h3>Game {game.id} aka {game.name}</h3>
          <h4>First Place: {game.firstPlace.name}</h4>
          <h4>Runner Up: {game.secondPlace.name}</h4>
          <h4>Number of Players: {game.numberOfPlayers}</h4>
          <h4>Prize Pool: £{game.numberOfPlayers * game.buyIn}</h4>
        </div>
      )}
    </>
  )
}

export default GameList