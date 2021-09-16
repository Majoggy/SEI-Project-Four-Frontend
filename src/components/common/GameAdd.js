import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button, Container, Col, Row } from 'react-bootstrap'
import { createGame, getAllPlayers } from '../../lib/api'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

function GameAdd() {
  const { register, handleSubmit } = useForm()
  const [payoutsKnown, setPayoutsKnown] = React.useState(false)
  const [playerNumKnown, setPlayerNumKnown] = React.useState(false)
  const [buyinKnown, setBuyinKnown] = React.useState(false)
  const [formData, setFormData] = React.useState({
    prizeForFirst: 0,
    prizeForSecond: 0,
    prizeForThird: 0,
    buyIn: '',
    numberOfPlayers: 3,
    userId: '1',
  })
  const [formErrors, setFormErrors] = React.useState({
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
    fourthPlace: '',
    fifthPlace: '',
    sixthPlace: '',
    seventhPlace: '',
    eighthPlace: '',
    ninthPlace: '',
    name: '',
    date: '',
  })
  const [isError, setIsError] = React.useState(false)
  const [playerList, setPlayerList] = React.useState(null)
  const history = useHistory()
  const [totalPotDifference, setTotalPotDifference] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const playerData = await getAllPlayers()
      setPlayerList(playerData.data)
      console.log(playerData.data)
    }
    getData()
  }, [])

  const handleSub = (event) => {
    setIsError(false)
    event.preventDefault()
    const name = event.target.name 

    if (name === 'numberOfPlayers' && formData[name]) {
      setPlayerNumKnown(true)
    } 

    if (name === 'buyIn' && formData[name] > 0) {
      setBuyinKnown(true)
    } else if (name === 'buyIn'){
      setIsError(true)
    }

    if (name === 'winnings') {
      if (parseInt(formData['prizeForFirst']) + parseInt(formData['prizeForSecond']) + parseInt(formData['prizeForThird']) === (parseInt(formData['buyIn']) * parseInt(formData['numberOfPlayers']))) {
        setPayoutsKnown(true)
      } else {

        setTotalPotDifference((parseInt(formData['prizeForFirst']) + parseInt(formData['prizeForSecond']) + parseInt(formData['prizeForThird'])) - ((parseInt(formData['buyIn']) * parseInt(formData['numberOfPlayers']))))
        setIsError(true)
      }
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, [event.target.name]: value })
  }

  const mergeThenSend = async (rankingsData) => {
    rankingsData = { ...rankingsData, ...formData }
    console.log(rankingsData)
    try {
      await createGame(rankingsData)
      history.push('/dashboard')
    } catch (err) {
      setFormErrors(err.response.data)
      // setFormErrors(err.response.data.errors)
    }
  }
  
  return (
    
    <Container className="login" fluid>
      <Row>
        <Col className="outer-col"></Col>
        <Col xs={4} className="form-vertical-align">
          <div className='log-game-form-wrap'>
            <h2>Add New Game</h2>
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
          <Button variant="none" className="btn-default" type="submit">
            Next
          </Button>
        </Form>
            }

            {!buyinKnown && playerNumKnown &&
          <Form name="buyIn" onSubmit={handleSub}>
            <Form.Group className="mb-3">
              <Form.Label>What is the buy-in?</Form.Label>
              <Form.Control 
                type="number"
                className={isError ? 'is-invalid' : ''}
                placeholder="Buy-in amount" 
                name="buyIn"
                onChange={handleChange}/>
              {isError && (
                <Form.Text className="text-muted">
                      Please enter a valid buy-in
                </Form.Text>
              )}  
            </Form.Group>

            <Button variant="none" className="btn-default" type="submit">
              Next
            </Button>
          </Form>
            }

            {playerNumKnown && buyinKnown && !payoutsKnown &&
          <Form name="winnings" onSubmit={handleSub}>
            <Form.Group className="mb-3">
              <Form.Label>Prize for First</Form.Label>
              <Form.Control 
                type="text"
                className={isError ? 'is-invalid' : ''}
                placeholder="Prize for First" 
                name="prizeForFirst"
                onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prize for Second</Form.Label>
              <Form.Control
                type="text"
                className={isError ? 'is-invalid' : ''}
                placeholder="Prize for Second"
                name="prizeForSecond"
                onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prize for Third</Form.Label>
              <Form.Control 
                type="text"
                className={isError ? 'is-invalid' : ''}
                placeholder="Prize for Third"
                name="prizeForThird"
                onChange={handleChange}/>
              {isError && (
                <Form.Text className="text-muted">
                  {totalPotDifference > 0 ? `Your payouts are £${totalPotDifference} bigger than the prize pool` : `Your payouts are £${totalPotDifference * -1} smaller than the prize pool` }
                </Form.Text>
              )}  
            </Form.Group>

            <Button variant="none" className="btn-default" type="submit">
              Next
            </Button>
          </Form>
            }

            {playerNumKnown && buyinKnown && payoutsKnown &&
          <Form name="players" onSubmit={handleSubmit(mergeThenSend)}>
            <Form.Group className="mb-3">
              <Form.Label>First Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['firstPlace'] ? 'is-invalid' : ''}`}
                {...register('firstPlace', { required: true })}
                name="firstPlace"
                defaultValue="def"
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['firstPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Second Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['secondPlace'] ? 'is-invalid' : ''}`}
                defaultValue="def"
                {...register('secondPlace', { required: true })}
                name="secondPlace"
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['secondPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Third Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['thirdPlace'] ? 'is-invalid' : ''}`}
                defaultValue="def"
                name="thirdPlace"
                {...register('thirdPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['thirdPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>

            {formData.numberOfPlayers > 3 &&
            <Form.Group className="mb-3">
              <Form.Label>Fourth Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['fourthPlace'] ? 'is-invalid' : ''}`}
                defaultValue="def"
                name="fourthPlace"
                {...register('fourthPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['fourthPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            {formData.numberOfPlayers > 4 &&
            <Form.Group className="mb-3">
              <Form.Label>Fifth Place</Form.Label>
              <Form.Control
                as="select"
                name="fifthPlace"
                className={`${formErrors['fifthPlace'] ? 'is-invalid' : ''}`}
                defaultValue="def"
                {...register('fifthPlace', { required: true })}
                onChange={handleChange}>
                <option value="def"  disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['fifthPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            {formData.numberOfPlayers > 5 &&
            <Form.Group className="mb-3">
              <Form.Label>Sixth Place</Form.Label>
              <Form.Control
                as="select"
                defaultValue="def"
                name="sixthPlace"
                className={`${formErrors['sixthPlace'] ? 'is-invalid' : ''}`}
                {...register('sixthPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['sixthPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            {formData.numberOfPlayers > 6 &&
            <Form.Group className="mb-3">
              <Form.Label>Seventh Place</Form.Label>
              <Form.Control
                as="select"
                defaultValue="def"
                className={`${formErrors['seventhPlace'] ? 'is-invalid' : ''}`}
                name="seventhPlace"
                {...register('seventhPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['seventhPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            {formData.numberOfPlayers > 7 &&
            <Form.Group className="mb-3">
              <Form.Label>Eighth Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['eighthPlace'] ? 'is-invalid' : ''}`}
                defaultValue="def"
                name="eighthPlace"
                {...register('eighthPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['eighthPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            {formData.numberOfPlayers > 8 &&
            <Form.Group className="mb-3">
              <Form.Label>Ninth Place</Form.Label>
              <Form.Control
                as="select"
                className={`${formErrors['ninthPlace'] ? 'is-invalid' : ''}`}
                name="ninthPlace"
                defaultValue="def"
                {...register('ninthPlace', { required: true })}
                onChange={handleChange}>
                <option value="def" disabled hidden>Select player</option>
                {playerList.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </Form.Control>
              {formErrors['ninthPlace'] && (
                <Form.Text className="text-muted">A player is required</Form.Text>
              )}
            </Form.Group>
            }
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text" 
                className={`${formErrors['date'] ? 'is-invalid' : ''}`}
                placeholder="Date"
                name="date" 
                {...register('date')}
              />
              {formErrors['date'] && (
                <Form.Text className="text-muted">A valid date is required</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Game name</Form.Label>
              <Form.Control
                type="text"
                className={`${formErrors['name'] ? 'is-invalid' : ''}`}
                placeholder="Game name"
                name="name" 
                {...register('name')}
              />
              {formErrors['name'] && (
                <Form.Text className="text-muted">A name is required for the game</Form.Text>
              )}
            </Form.Group>
            <Button variant="none" className="btn-default" type="submit">
            Add Game
            </Button>
          </Form>
            }
          </div>
        </Col>
        <Col className="outer-col"></Col>
      </Row>
    </Container>
    
  )
}

export default GameAdd