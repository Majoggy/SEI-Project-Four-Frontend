import React from 'react'
import { useLocation } from 'react-router-dom'

import GameCard from '../cards/GameCard'


function GameList({ games }) {

  useLocation()
  return (
    <>
      {games && games.map(game => <GameCard key={game.id} game={game}/>
      )}
    </>
  )
}

export default GameList