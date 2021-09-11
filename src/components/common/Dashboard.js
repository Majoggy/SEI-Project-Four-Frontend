import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { getAllGames } from '../../lib/api'

import GameList from './GameList'
import Leaderboard from './Leaderboard'

function Dashboard() {

  const [games, setGames] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllGames()
        setGames(res.data)
        console.log(games)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div className="dash-wrap">
      <div className="dash-left">
        <section className="button-wrap">
          <Button variant="dark" size="lg">
            Add Player
          </Button>
          <Button variant="dark" size="lg">
            Add Game
          </Button>
        </section>
        <section className="game-list-wrap">
          <GameList games={games}/>
        </section>
      </div>
      <div className="dash-right">
        <section className="leaderboard-wrap">
          <Leaderboard games={games}/>
        </section>
      </div>
    </div>
    
  )
}

export default Dashboard