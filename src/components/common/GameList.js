import React from 'react'
import GameCard from '../cards/GameCard'
import EmptyGameCard from '../cards/EmptyGameCard'
import { mostRecentSort } from '../../lib/filterFunctions'

function GameList({ games, refetchData, gameHistory }) {

  return (
    <>
      {games && gameHistory === 0 && mostRecentSort(games, 'id').slice(0, 8)
        .map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
        )}
      {games && gameHistory === 1 && mostRecentSort(games, 'id').slice(8, 16)
        .map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
        )}
      {games && gameHistory === 2 && mostRecentSort(games, 'id').slice(16, 24)
        .map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
        )}
      {games && gameHistory === 3 && mostRecentSort(games, 'id').slice(24, 32)
        .map(game => <GameCard key={game.id} game={game} refetchData={refetchData}/>
        )}
      {games &&
      <>
        {(games.length === 1 || gameHistory === 1 && games.length === 9 || gameHistory === 2 && games.length === 17) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games.length === 2 || gameHistory === 1 && games.length === 10 || gameHistory === 2 && games.length === 18) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games && games.length === 3 || gameHistory === 1 && games.length === 11 || gameHistory === 2 && games.length === 19) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games.length === 4 || gameHistory === 1 && games.length === 12 
      || gameHistory === 2 && games.length === 20) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games.length === 5 || gameHistory === 1 && games.length === 13 
        || gameHistory === 2 && games.length === 21) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games.length === 6 || gameHistory === 1 && games.length === 14 
        || gameHistory === 2 && games.length === 22) &&
      <>
        <EmptyGameCard />
        <EmptyGameCard />
      </>} 
        {(games.length === 7 || gameHistory === 1 && games.length === 15 
        || gameHistory === 2 && games.length === 23) &&
      <>
        <EmptyGameCard />
      </>} 
      </>}
    </>
  )
}

export default GameList