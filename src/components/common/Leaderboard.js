import React from 'react'

import { Table } from 'react-bootstrap'
import Loading from './Loading'
import NoPlayers from './NoPlayers'

function Leaderboard({ filteredStats, playerStats }) {
  return (
    <>
      <div style={{ marginBottom: '-15px' }}>
        {!playerStats && <Loading />}
        {playerStats && playerStats.length < 1 && <NoPlayers />}
        {playerStats && playerStats.length > 0 &&
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
              {!filteredStats && playerStats.map(player =>
                <tr key={player.name}>
                  <td>{player.name}</td>
                  <td>{player.gamesPlayed === 0 ? '-' : player.gamesPlayed}</td>
                  <td>{player.topTwoPercentage}</td>
                  <td>{player.winnings ? `£${player.winnings}` : '-'}</td>
                  <td>{player.losses ? `£${player.losses}` : '-'}</td>
                  <td>{player.total}</td>
                  <td>{player.average}</td>
                </tr>
              ).slice(0, 14)}
              {filteredStats && filteredStats.map(player =>
                <tr key={player.name}>
                  <td>{player.name}</td>
                  <td>{player.gamesPlayed === 0 ? '-' : player.gamesPlayed}</td>
                  <td>{player.topTwoPercentage}</td>
                  <td>{player.winnings ? `£${player.winnings}` : '-'}</td>
                  <td>{player.losses ? `£${player.losses}` : '-'}</td>
                  <td>{player.total}</td>
                  <td>{player.average}</td>
                </tr>
              ).slice(0, 14)}
            </tbody>
          </Table>
        </>
        }
      </div>
    </>
  )
}

export default Leaderboard