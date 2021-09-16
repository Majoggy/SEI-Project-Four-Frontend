import React from 'react'
import GameCard from '../cards/GameCard'
import EmptyGameCard from '../cards/EmptyGameCard'

function GameList({ games, refetchData }) {
  return (
    <>

      {games && games.map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
      )}
      {games && games.length === 1 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 2 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 3 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 4 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 5 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 6 &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
      {games && games.length === 7 &&
      <>
        <EmptyGameCard />
      </>} 
    </>
  )
}

export default GameList