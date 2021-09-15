import React from 'react'
import GameCard from '../cards/GameCard'

function GameList({ games, refetchData }) {
  return (
    <>
      {games && games.map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
      )}
    </>
  )
}

export default GameList