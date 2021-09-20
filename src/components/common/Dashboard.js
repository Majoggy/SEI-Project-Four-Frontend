import React, { useCallback } from 'react'
import { Button, Dropdown, Image } from 'react-bootstrap'
import { getAllGames, getAllPlayers } from '../../lib/api'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import NoGames from './NoGames'
import { statify } from '../../lib/helpers'
import { alphaSort, gamesPlayedSort, totalSort, topTwoSort } from '../../lib/filterFunctions'

import GameList from './GameList'
import Leaderboard from './Leaderboard'
import Loading from './Loading'

function Dashboard() {
  const [games, setGames] = React.useState(null)
  const [players, setPlayers] = React.useState(null)
  const [playerStats, setPlayerStats] = React.useState(null)
  const [filteredStats, setFilteredStats] = React.useState(null)

  const getData = async () => {
    try {
      const gameRes = await getAllGames()
      const playerRes = await getAllPlayers()
      setGames(gameRes.data)
      setPlayers(playerRes.data)
      setPlayerStats(alphaSort(statify(gameRes.data, playerRes.data)))
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  useLocation()

  const toggleFilter = useCallback(event => {
    const value = event.target.target
    if (value === 'alpha') {
      setFilteredStats(alphaSort(playerStats))
    }
    if (value === 'gamesPlayed') { 
      setFilteredStats(gamesPlayedSort(playerStats))
    }    if (value === 'total') {
      setFilteredStats(totalSort(playerStats))
    }    if (value === 'topTwoPercentage') {
      setFilteredStats(topTwoSort(playerStats))
    }
  })

  React.useEffect(() => {
    setFilteredStats()
  }, [toggleFilter])
  
  

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
              <Image height="400px" src="https://i.ibb.co/p4qvTsh/cards.png" className="card-img" alt="cards" border="0"/>
            </div>)}
        </div>
        <div className="container dash-right">
          <section className="container spacing">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic"  className="button-height btn-default">
                Order By
              </Dropdown.Toggle>
              <Dropdown.Menu onClick={toggleFilter}>
                <Dropdown.Item target='alpha'>Alphabetical</Dropdown.Item>
                <Dropdown.Item target='gamesPlayed'>Games Played</Dropdown.Item>
                <Dropdown.Item target='total'>Profit/Loss</Dropdown.Item>
                <Dropdown.Item target='topTwoPercentage'>Top Two Percentage</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </section>
          <section 
            className=
              {`${!games ? 'no-game-flex container leaderboard-wrap light-grey'
                : 'container leaderboard-wrap light-grey'}`}
            style={ games && games.length < 1 ? { height: 'auto' } : { }}>
            <Leaderboard playerStats={playerStats} filteredStats={filteredStats}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard