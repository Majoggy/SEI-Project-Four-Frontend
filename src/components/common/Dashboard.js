import React from 'react'
import { Button } from 'react-bootstrap'
import { getAllGames, getAllPlayers } from '../../lib/api'
import { useHistory } from 'react-router-dom'

import GameList from './GameList'
import Leaderboard from './Leaderboard'

function Dashboard() {
  const [games, setGames] = React.useState(null)
  const [players, setPlayers] = React.useState(null)
  const history = useHistory()

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

  const handleClick = () => {
    history.push('/addplayer')
  }

  return (
    <div className="dash-wrap">
      <div className="dash-left">
        <section className="button-wrap">
          <Button className="button-height" variant="dark" size="lg" onClick={handleClick}>
            Add Player
          </Button>
          <Button className="button-height" variant="dark" size="lg">
            Add Game
          </Button>
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