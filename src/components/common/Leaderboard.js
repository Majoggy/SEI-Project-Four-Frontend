import React from 'react'
import { statify } from '../../lib/helpers'
import { Table } from 'react-bootstrap'
import Loading from './Loading'

function Leaderboard({ games, players }) {
  const [playerStats, setPlayerStats] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        setPlayerStats(statify(games, players))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [games, players])

  console.log(playerStats)

  return (
    <>
      <div>
        {!playerStats && <Loading />}
        {playerStats &&
        <>  
          <Table className="table table-bordered" striped bordered hover>
            <thead>
              <tr >
                <th style={{ height: '30px' }}>Name</th>
                <th>Games Played</th>
                <th>Top Two Percentage</th>
                <th>Total Won</th>
                <th>Total Spent</th>
                <th>Profit/loss</th>
                <th>Per game</th>
              </tr>
            </thead>
            <tbody>
              
              {playerStats.map(player =>
                <tr key={player.name}>
                  <td><strong>{player.name}</strong></td>
                  <td>{player.gamesPlayed === 0 ? '-' : player.gamesPlayed}</td>
                  <td>{player.topTwoPercentage}</td>
                  <td>{player.winnings ? `£${player.winnings}` : '-'}</td>
                  <td>{player.losses ? `£${player.losses}` : '-'}</td>
                  <td>{player.total}</td>
                  <td>{player.average}</td>
                </tr>
              )}
              
            </tbody>
            
          </Table>
        </>
        }
      </div>
    </>
  )
}

export default Leaderboard



{/* {playerStats && playerStats.map(player => 
  <div className="player-card" key={player.name}>
    <h6>{player.name}</h6>
    <a>Games played: {player.gamesPlayed}</a>
    <a>Top two: {player.topTwoPercentage}</a>
    <a>Profit/loss: {player.total}</a>
    <a>Profit per game: {player.average}</a>
  </div>
)} */}