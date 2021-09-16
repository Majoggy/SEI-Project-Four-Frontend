import React from 'react'
import { Button, Image } from 'react-bootstrap'
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
    <div className="the-back misc-grey">
      <div className="dash-wrap misc-grey">
        <div className="container dash-left">
          <section className="container button-wrap">
            <Link to="/addplayer">
              <Button variant="none" className="button-height btn-default">
              Add Player
              </Button>
            </Link>
            <Link to="/addgame" players={players}>
              <Button variant="none" className="button-height btn-default">
                Add Game
              </Button>
            </Link>
          </section>
          <section className={`${games < 1 ? 'no-game-flex game-list-wrap light-grey' : 'game-list-wrap light-grey'}`}>
            {!games && <Loading />}
            {games && games < 1 && <NoGames />}
            <GameList games={games} refetchData={getData}/>
          </section>
          {games && games < 1 && (
            <div className="card-wrap">
              <Image height="400px" opacity="0.5" src="https://i.ibb.co/p4qvTsh/cards.png" className="card-img" alt="cards" border="0"/>
            </div>)}
        </div>
        <div className="container dash-right">
          <section className="container spacing">
          </section>
          <section 
            className=
              {`${!games ? 'no-game-flex container leaderboard-wrap light-grey'
                : 'container leaderboard-wrap light-grey'}`}
            style={ games && games.length < 1 ? { height: 'auto' } : { }}>
            <Leaderboard games={games} players={players}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard