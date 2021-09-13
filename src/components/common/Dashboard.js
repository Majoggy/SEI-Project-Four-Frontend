import React from 'react'
import { Button } from 'react-bootstrap'
import { getAllGames, getAllPlayers } from '../../lib/api'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import GameList from './GameList'
import Leaderboard from './Leaderboard'

function Dashboard() {
  const [games, setGames] = React.useState(null)
  const [players, setPlayers] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameRes = await getAllGames()
        const playerRes = await getAllPlayers()
        setGames(gameRes.data)
        setPlayers(playerRes.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useLocation()

  return (
    <div className="dash-wrap">
      <div className="dash-left">
        <section className="button-wrap">
          <Link to="/addplayer">
            <Button className="button-height" variant="dark" size="lg" name="">
            Add Player
            </Button>
          </Link>
          <Link to="/addgame" players={players}>
            <Button className="button-height" variant="dark" size="lg">
              Add Game
            </Button>
          </Link>
        </section>
        <section className="game-list-wrap">
          <GameList games={games}/>
        </section>
      </div>
      <div className="dash-right">
        <section className="leaderboard-wrap">
          <Leaderboard games={games} players={players}/>
        </section>
      </div>
    </div>
    
  )
}

export default Dashboard