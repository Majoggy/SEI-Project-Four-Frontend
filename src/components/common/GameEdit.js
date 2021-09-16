import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { getSingleGame, getAllPlayers, editGame } from '../../lib/api'
import { useLocation, useHistory } from 'react-router-dom'

function GameEdit() {
  const [playerList, setPlayerList] = React.useState(null)
  const [formData, setFormData] = React.useState(null)
  const { register, handleSubmit } = useForm()
  const [formErrors, setFormErrors] = React.useState({
    buyIn: '',
    prizeForFirst: '',
    prizeForSecond: '',
    prizeForThird: '',
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
  const onSubmit = async newData => {
    newData = { ...newData, userId: formData['userId'], numberOfPlayers: formData['numberOfPlayers'] }
    console.log(newData)
    try {
      await editGame(gameId, newData)
      history.push('/dashboard')
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  const location = useLocation()
  const history = useHistory()
  const gameId = location.state.game

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameData = await getSingleGame(gameId)
        const playerData = await getAllPlayers()
        setFormData(gameData.data)
        setPlayerList(playerData.data)
      } catch (err) {
        console.log('errorsss oh noo')
      }
    }
    getData()
  }, [gameId])

  return (
    <Container className="login" fluid>
      {formData && playerList && (
        <>
          <Row>
            <Col className="outer-col"></Col>
            <Col xs={4} className="form-vertical-align">
              <h2>Edit Game</h2>
              <Form name="editForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Buy In</Form.Label>
                  <Form.Control
                    type="number"
                    className={`${formErrors['buyIn'] ? 'is-invalid' : ''}`}
                    {...register('buyIn')}
                    placeholder="Buy In"
                    name="buyIn"
                    defaultValue={formData.buyIn}
                  />
                  {formErrors['buyIn'] && (
                    <Form.Text className="text-muted">A Buy In is required</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Prize For First</Form.Label>
                  <Form.Control
                    type="number"
                    className={`${formErrors['prizeForFirst'] ? 'is-invalid' : ''}`}
                    placeholder="Prize For First"
                    name="prizeForFirst"
                    defaultValue={formData.prizeForFirst}
                    {...register('prizeForFirst')}
                  />
                  {formErrors['prizeForFirst'] && (
                    <Form.Text className="text-muted">A prize for first place is required</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prize For Second</Form.Label>
                  <Form.Control
                    type="number"
                    className={`${formErrors['prizeForSecond'] ? 'is-invalid' : ''}`}
                    placeholder="Prize For Second"
                    name="prizeForSecond"
                    defaultValue={formData.prizeForSecond}
                    {...register('prizeForSecond')}
                  />
                  {formErrors['prizeForSecond'] && (
                    <Form.Text className="text-muted">A prize for second place is required</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prize For Third</Form.Label>
                  <Form.Control
                    type="number"
                    className={`${formErrors['prizeForThird'] ? 'is-invalid' : ''}`}
                    placeholder="Prize For Third"
                    name="prizeForThird"
                    defaultValue={formData.prizeForThird}
                    {...register('prizeForThird')}
                  />
                  {formErrors['prizeForThird'] && (
                    <Form.Text className="text-muted">A prize for third place is required</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>First Place</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="def"
                    {...register('firstPlace', { required: true })}
                    name="firstPlace">
                    <option value={formData.firstPlace.id}>{formData.firstPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.firstPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Second Place</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="def"
                    {...register('secondPlace', { required: true })}
                    name="secondPlace">
                    <option value={formData.secondPlace.id}>{formData.secondPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.secondPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Third Place</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="def"
                    {...register('thirdPlace', { required: true })}
                    name="thirdPlace">
                    <option value={formData.thirdPlace.id}>{formData.thirdPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.thirdPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {formData.fourthPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Fourth Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('fourthPlace', { required: true })}
                    name="fourthPlace">
                    <option value={formData.fourthPlace.id}>{formData.fourthPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.fourthPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}

                {formData.fifthPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Fifth Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('fifthPlace', { required: true })}
                    name="fifthPlace">
                    <option value={formData.fifthPlace.id}>{formData.fifthPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.fifthPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}
                
                {formData.sixthPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Sixth Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('sixthPlace', { required: true })}
                    name="sixthPlace">
                    <option value={formData.sixthPlace.id}>{formData.sixthPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.sixthPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}

                {formData.seventhPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Seventh Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('seventhPlace', { required: true })}
                    name="seventhPlace">
                    <option value={formData.seventhPlace.id}>{formData.seventhPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.seventhPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}

                {formData.eighthPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Eighth Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('eighthPlace', { required: true })}
                    name="eighthPlace">
                    <option value={formData.eighthPlace.id}>{formData.eighthPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.eighthPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}

                {formData.ninthPlace &&
                <Form.Group className="mb-3">
                  <Form.Label>Ninth Place</Form.Label>
                  <Form.Control
                    as="select"
                    {...register('ninthPlace', { required: true })}
                    name="ninthPlace">
                    <option value={formData.ninthPlace.id}>{formData.ninthPlace.name}</option>
                    {playerList.filter(player => player.id !== formData.ninthPlace.id).map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>}

                <Form.Group className="mb-3">
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${formErrors['name'] ? 'is-invalid' : ''}`}
                    placeholder="Game Name"
                    name="name"
                    defaultValue={formData.name}
                    {...register('name')}
                  />
                  {formErrors['name'] && (
                    <Form.Text className="text-muted">A name for the game is required</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Game Date</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${formErrors['date'] ? 'is-invalid' : ''}`}
                    placeholder="Game Date"
                    name="date"
                    defaultValue={formData.date}
                    {...register('date')}
                  />
                  {formErrors['date'] && (
                    <Form.Text className="text-muted">A date is required</Form.Text>
                  )}
                </Form.Group>
                <Button variant="none" className="btn-default" type="submit">
                Submit Changes
                </Button>
              </Form>
            </Col>
            <Col className="outer-col"></Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default GameEdit