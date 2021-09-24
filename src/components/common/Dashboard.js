import React, { useCallback } from 'react'
import { Button, Dropdown, Image } from 'react-bootstrap'
import { getAllGames, getAllPlayers } from '../../lib/api'
import { Link } from 'react-router-dom'
import NoGames from './NoGames'
import { statify } from '../../lib/helpers'
import { alphaSort, gamesPlayedSort, totalSort, topTwoSort } from '../../lib/filterFunctions'
import { getPayLoad } from '../../lib/auth'

import GameList from './GameList'
import Leaderboard from './Leaderboard'
import Loading from './Loading'

function Dashboard() {
  const [games, setGames] = React.useState(null)
  const [players, setPlayers] = React.useState(null)
  const [playerStats, setPlayerStats] = React.useState(null)
  const [filteredStats, setFilteredStats] = React.useState(null)
  const [gameHistory, setGameHistory] = React.useState(0)
  const [userId, setUserId] = React.useState(null)

  const [unfilteredGames, setunfilteredGames] = React.useState(null)
  const [unfilteredPlayers, setunfilteredPlayers] = React.useState(null)

  const getData = async () => {
    try {
      const gameRes = await getAllGames()
      const playerRes = await getAllPlayers()
      setunfilteredGames(gameRes.data)
      setunfilteredPlayers(playerRes.data)
      const payLoad = getPayLoad()
      const user = payLoad.sub
      setUserId(user)
    } catch (err) {
      console.log(err)
    }
  }


  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    const filterForId = async () => {
      try {
        setGames(unfilteredGames.filter(game => game.userId === userId))
        setPlayers(unfilteredPlayers.filter(game => game.userId === userId))
      } catch (err) {
        console.log(err)
      }
    }
    filterForId()
  }, [unfilteredGames, userId, unfilteredPlayers])

  React.useEffect(() => {
    const filterForId = async () => {
      try {
        setPlayerStats(alphaSort(statify(games, players)))
      } catch (err) {
        console.log(err)
      }
    }
    filterForId()
  }, [games, players])

  const toggleFilter = useCallback(event => {
    const value = event.target.target
    if (value === 'alpha') setFilteredStats(alphaSort(playerStats))
    if (value === 'gamesPlayed') setFilteredStats(gamesPlayedSort(playerStats))
    if (value === 'total') setFilteredStats(totalSort(playerStats))
    if (value === 'topTwoPercentage') setFilteredStats(topTwoSort(playerStats))
  })

  React.useEffect(() => {
    setFilteredStats()
  }, [toggleFilter])
  
  const handleBackward = () => {
    if (gameHistory === 3) setGameHistory(2)
    if (gameHistory === 2) setGameHistory(1)
    if (gameHistory === 1) setGameHistory(0)
    
  }

  const handleForward = () => {
    if (gameHistory === 0 && games.length > 8 ) {
      setGameHistory(1)
    }
    if (gameHistory === 1 && games.length > 16 ) {
      setGameHistory(2)
    }
    if (gameHistory === 2 && games.length > 24 ) {
      setGameHistory(3)
    }
  }
  
  return (
    <div className="the-back off-white">
      <div className="dash-wrap off-white">
        <div className="container dash-left">
          <section className="container button-wrap">
            <Link to="/addplayer" userId={userId}>
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
          <section className={`${games < 1 ? 'no-game-flex game-list-wrap light-grey' :
            'game-list-wrap light-grey'}`}>
            {!games && <Loading />}
            {games && games < 1 && <NoGames />}
            <GameList games={games} gameHistory={gameHistory} refetchData={getData}/>
          </section>
          {games && games < 1 && (
            <div className="card-wrap">
              <Image 
                height="400px" 
                src="https://i.ibb.co/p4qvTsh/cards.png" 
                className="card-img" 
                alt="cards" 
                border="0"/>
            </div>)}
          {(games && games.length > 0) &&
          <div className='game-browse-buttons'>
            <>
              {gameHistory > 0 ? 
                <Button variant="none"
                  onClick={handleBackward}
                  className="button-height btn-default">
                Back
                </Button> : 
                <Button
                  variant="dark"
                  className="button-height">
                Back
                </Button>}
              {games &&
            <>
              {(gameHistory === 0 && games.length < 9 
                || gameHistory === 1 && games.length < 18 
                || gameHistory === 2 && games.length < 27) ? 
                <Button 
                  variant="dark" 
                  className="button-height forward-button"
                >
                Forward
                </Button> : 
                <Button 
                  variant="none" 
                  onClick={handleForward} 
                  className="button-height btn-default forward-button"
                >
                Forward
                </Button>}
            </>}
            </>
          </div>}
        </div>
        <div className="container dash-right">
          <section className="container spacing">
            <Dropdown>
              <Dropdown.Toggle 
                variant="none" 
                id="dropdown-basic"  
                className="button-height btn-default"
              >
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
              {`${playerStats && playerStats.length < 1 ? 'no-game-flex container leaderboard-wrap light-grey'
                : 'container leaderboard-wrap light-grey'}`}
            style={ games && games.length < 1 ? { height: 'auto' } : { }}>
            <Leaderboard 
              playerStats={playerStats} 
              filteredStats={filteredStats}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard