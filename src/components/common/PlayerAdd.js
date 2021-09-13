import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { createPlayer } from '../../lib/api'

function PlayerAdd() {

  const initialState = {
    name: '',
    image: '',
  }

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPlayer(formData)
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
          <Col xs={6} className="form-vertical-align">
            <Form onSubmit={handleSubmit}>
              <h4>Player Add</h4>
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
              <Button variant="secondary" type="submit">
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