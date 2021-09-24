import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { createPlayer } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'

function PlayerAdd() {

  const initialState = {
    name: '',
    image: '',
    userId: '',
  }

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [userId, setUserId] = React.useState(null)

  const getData = async () => {
    try {
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPlayer({ ...formData, userId: userId })
      history.push('/dashboard')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <>
      <Container className="login" fluid>
        <Row>
          <Col className="outer-col"></Col>
          <Col xs={4} className="form-vertical-align">
            <Form onSubmit={handleSubmit}>
              <h2>Add Player</h2>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Player Name"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image (optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Player Image"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {isError && (
                  <Form.Text className="text-muted">
                    Player name already in use, please choose another.
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="none" className="btn-default" type="submit">
                Create Player
              </Button>
            </Form>
          </Col>
          <Col className="outer-col"></Col>
        </Row>
      </Container>
    </>
  )
}

export default PlayerAdd