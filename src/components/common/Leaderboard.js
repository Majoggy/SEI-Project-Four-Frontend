import React from 'react'
import { statify } from '../../lib/helpers'

function Leaderboard({ games, players }) {
  const [playerStats, setPlayerStats] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const statData = await statify(games, players)
        setPlayerStats(statData)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [games, players])

  return (
    <>
      {playerStats && playerStats.map(player => 
        <div key={player.name} className="">
          <h5 >{player.name}</h5>
          <h6>Games played: {player.gamesPlayed}</h6>
          <h6>Top two percentage: {player.topTwoPercentage}</h6>
          <h6>Profit/loss: {player.total}</h6>
          <h6>Profit per game: {player.average}</h6>
        </div>
      )}
    </>
  )
}

export default Leaderboard