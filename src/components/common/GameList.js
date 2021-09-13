import React from 'react'

import GameCard from '../cards/GameCard'

function GameList({ games }) {
  return (
    <>
      {games && games.map(game => <GameCard key={game.id} game={game}/>
      )}
    </>
  )
}

export default GameList