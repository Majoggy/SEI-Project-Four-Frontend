import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'

import { registerUser } from '../../lib/api'

function Register() {

  const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    console.log(formData)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerUser(formData)
      history.push('/dashboard')
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      <Container className="register" fluid>
        <Row>
          <Col className="outer-col"></Col>
          <Col xs={4} className="form-vertical-align">
            <Form onSubmit={handleSubmit}>
              <h4>Register</h4>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter Username"
                  name="username"
                  className={`${formErrors.username ? 'is-invalid' : ''}`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <Form.Text className="text-muted">{formErrors.username}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className={`${formErrors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={`${formErrors.password ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <Form.Text className="text-muted">{formErrors.password}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  className={`${formErrors.passwordConfirmation ? 'is-invalid' : ''}`}
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
                {formErrors.passwordConfirmation && (
                  <Form.Text className="text-muted">
                    {formErrors.passwordConfirmation}
                  </Form.Text>
                )}
              </Form.Group>

              <Button variant="secondary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
          <Col className="outer-col"></Col>
        </Row>
      </Container>
    </>
  )
}

export default Register