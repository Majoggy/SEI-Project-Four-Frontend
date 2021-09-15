import React from 'react'
import { Button } from 'react-bootstrap'
import { getAllGames, getAllPlayers } from '../../lib/api'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import NoGames from './NoGames'

import GameList from './GameList'
import Leaderboard from './Leaderboard'
import Loading from './Loading'

function Dashboard() {
  const [games, setGames] = React.useState(null)
  const [players, setPlayers] = React.useState(null)
  
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

  React.useEffect(() => {
    getData()
  }, [])

  useLocation()

  return (
    <div className="the-back">
      <div className="dash-wrap">
        <div className="container dash-left">
          <section className="container button-wrap">
            <Link to="/addplayer">
              <Button className="button-height button-border" variant="dark" size="lg" name="">
              Add Player
              </Button>
            </Link>
            <Link to="/addgame" players={players}>
              <Button className="button-height button-border" variant="dark" size="lg">
                Add Game
              </Button>
            </Link>
          </section>
          <section className={`${games < 1 ? 'no-game-flex container game-list-wrap' : 'container game-list-wrap'}`}>
            {!games && <Loading />}
            {games && games < 1 && <NoGames />}
            <GameList games={games} refetchData={getData}/>
          </section>
        </div>
        <div className="container dash-right">
          <section className="container spacing">
          </section>
          <section className={`${games < 1 ? 'no-game-flex container leaderboard-wrap' : 'container leaderboard-wrap'}`}>
            <Leaderboard games={games} players={players}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard