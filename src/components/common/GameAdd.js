import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button, Container } from 'react-bootstrap'
import { createGame, getAllPlayers } from '../../lib/api'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'


function GameAdd() {
  const { register, handleSubmit } = useForm()
  const [payoutsKnown, setPayoutsKnown] = React.useState(false)
  const [playerNumKnown, setPlayerNumKnown] = React.useState(false)
  const [buyinKnown, setBuyinKnown] = React.useState(false)
  const [formData, setFormData] = React.useState({
    prizeForFirst: '',
    prizeForSecond: '',
    prizeForThird: '',
    buyIn: '',
    numberOfPlayers: 3,
    userId: '1',
  })
  const [playerList, setPlayerList] = React.useState(null)
  const history = useHistory()

  React.useEffect(() => {
    const getData = async () => {
      const playerData = await getAllPlayers()
      setPlayerList(playerData.data)
      console.log(playerData.data)
    }
    getData()
  }, [])

  const handleSub = (event) => {
    event.preventDefault()
    const name = event.target.name 

    if (name === 'numberOfPlayers' && formData[name]) {
      setPlayerNumKnown(true)
    }
    if (name === 'buyIn' && formData[name] > 0) {
      setBuyinKnown(true)
    }
    if (name === 'winnings') {
      if (parseInt(formData['prizeForFirst']) + parseInt(formData['prizeForSecond']) + parseInt(formData['prizeForThird']) === (parseInt(formData['buyIn']) * parseInt(formData['numberOfPlayers'])))
        setPayoutsKnown(true)
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    console.log(formData)
  }

  const mergeThenSend = async (rankingsData) => {
    rankingsData = { ...rankingsData, ...formData }
    console.log(rankingsData)
    try {
      await createGame(rankingsData)
      history.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <Container>
        <div className='log-game-form-wrap'>
          {!playerNumKnown && 
        <Form name="numberOfPlayers" onSubmit={handleSub}>
          <Form.Group className="mb-3">
            <Form.Label>How many players in your game?</Form.Label>
            <Form.Control
              as="select"
              name="numberOfPlayers"
              onChange={handleChange}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Form.Control>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
          }

          {!buyinKnown && playerNumKnown &&
          <Form name="buyIn" onSubmit={handleSub}>
            <Form.Group className="mb-3">
              <Form.Label>What is the buy-in?</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Buy-in amount" 
                name="buyIn"
                onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          }

          {playerNumKnown && buyinKnown && !payoutsKnown &&
          <Form name="winnings" onSubmit={handleSub}>
            <Form.Group className="mb-3">
              <Form.Label>Prize for First</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Prize for First" 
                name="prizeForFirst"
                onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prize for Second</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Prize for Second"
                name="prizeForSecond"
                onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prize for Third</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Prize for Third"
                name="prizeForThird"
                onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          }

          {playerNumKnown && buyinKnown && payoutsKnown &&
          <Form name="players" onSubmit={handleSubmit(mergeThenSend)}>
            <Form.Group className="mb-3">
              <Form.Label>First Place</Form.Label>
              <Form.Control
                as="select"
                {...register('firstPlace', { required: true })}
                name="firstPlace"
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Second Place</Form.Label>
              <Form.Control
                as="select"
                {...register('secondPlace', { required: true })}
                name="secondPlace"
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Third Place</Form.Label>
              <Form.Control
                as="select"
                name="thirdPlace"
                {...register('thirdPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {formData.numberOfPlayers > 3 &&
            <Form.Group className="mb-3">
              <Form.Label>Fourth Place</Form.Label>
              <Form.Control
                as="select"
                name="fourthPlace"
                {...register('fourthPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {formData.numberOfPlayers > 4 &&
            <Form.Group className="mb-3">
              <Form.Label>Fifth Place</Form.Label>
              <Form.Control
                as="select"
                name="fifthPlace"
                {...register('fifthPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {formData.numberOfPlayers > 5 &&
            <Form.Group className="mb-3">
              <Form.Label>Sixth Place</Form.Label>
              <Form.Control
                as="select"
                name="sixthPlace"
                {...register('sixthPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {formData.numberOfPlayers > 6 &&
            <Form.Group className="mb-3">
              <Form.Label>Seventh Place</Form.Label>
              <Form.Control
                as="select"
                name="seventhPlace"
                {...register('seventhPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {formData.numberOfPlayers > 7 &&
            <Form.Group className="mb-3">
              <Form.Label>Eighth Place</Form.Label>
              <Form.Control
                as="select"
                name="eighthPlace"
                {...register('eighthPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {formData.numberOfPlayers > 8 &&
            <Form.Group className="mb-3">
              <Form.Label>Ninth Place</Form.Label>
              <Form.Control
                as="select"
                name="ninthPlace"
                {...register('ninthPlace', { required: true })}
                onChange={handleChange}>
                <option value="" selected disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Date"
                name="date" 
                {...register('date', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Game name</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Game name"
                name="name" 
                {...register('name', { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
          </Form>
          }
        </div>
      </Container>
    </>
  )
}

export default GameAdd