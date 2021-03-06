import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  CUSTOMER_ROUTE,
  REGISTRATION_ROUTE,
  STUFF_ROUTE,
  TICKETS_ROUTE,
} from '../utils/Consts'
import { Context } from '../index'
import { customerLogin } from '../http/customerAPI'
import { stuffLogin, stuffRegistration } from '../http/stuffAPI'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/fonts/fonts.css'
import '../styles/navBar/navbar.css'
import '../styles/button/button.css'
import '../styles/auth/auth.css'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin =
    location.pathname === STUFF_ROUTE + LOGIN_ROUTE ||
    location.pathname === CUSTOMER_ROUTE + LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data
      if (isLogin && location.pathname === STUFF_ROUTE + LOGIN_ROUTE) {
        data = await stuffLogin(login, password)
      } else if (
        isLogin &&
        location.pathname === CUSTOMER_ROUTE + LOGIN_ROUTE
      ) {
        data = await customerLogin(email)
      } else if (
        !isLogin &&
        location.pathname === STUFF_ROUTE + REGISTRATION_ROUTE
      ) {
        data = await stuffRegistration(login, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      user.setRole(data.role)
      if (location.pathname === CUSTOMER_ROUTE + LOGIN_ROUTE) {
        navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)
      } else if (
        location.pathname === STUFF_ROUTE + LOGIN_ROUTE ||
        location.pathname === STUFF_ROUTE + REGISTRATION_ROUTE
      ) {
        navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '62.5vh' }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="authForm_title">
          {isLogin ? '??????????????????????' : '??????????????????????'}
        </h2>

        <Row>
          <Col className="d-flex justify-content-center">
            <div
              className={
                location.pathname === STUFF_ROUTE + LOGIN_ROUTE ||
                location.pathname === STUFF_ROUTE + REGISTRATION_ROUTE
                  ? 'heading3_1 active-page'
                  : 'heading3_1'
              }
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(
                  isLogin
                    ? STUFF_ROUTE + LOGIN_ROUTE
                    : STUFF_ROUTE + REGISTRATION_ROUTE
                )
              }
            >
              ??????????????????????????
            </div>
          </Col>
          <Col className="d-flex justify-content-center">
            <div
              className={
                location.pathname === CUSTOMER_ROUTE + LOGIN_ROUTE
                  ? 'heading3_1 active-page'
                  : 'heading3_1'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(CUSTOMER_ROUTE + LOGIN_ROUTE)}
            >
              ????????????????????
            </div>
          </Col>
        </Row>
        {location.pathname === STUFF_ROUTE + REGISTRATION_ROUTE ||
        location.pathname === STUFF_ROUTE + LOGIN_ROUTE ? (
          <Form className="d-flex flex-column">
            <Form.Group controlId="formBasicLogin">
              <Form.Control
                className="mt-3"
                placeholder="?????????????? ?????? login..."
                autocomplete="on"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="mt-3"
                placeholder="?????????????? ?????? ????????????..."
                autocomplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              {isLogin ? (
                <div className="heading4">
                  ?????? ?????????????????{' '}
                  <div
                    className="heading5"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(STUFF_ROUTE + REGISTRATION_ROUTE)}
                  >
                    ??????????????????????????????!
                  </div>
                </div>
              ) : (
                <div className="heading4">
                  ???????? ???????????????{' '}
                  <div
                    className="heading5"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}
                  >
                    ??????????????!
                  </div>
                </div>
              )}
              <Button
                className="button2"
                variant={'outline-success'}
                onClick={click}
              >
                {isLogin ? '??????????' : '??????????????????????'}
              </Button>
            </Row>
          </Form>
        ) : (
          <Form className="d-flex flex-column">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="mt-3"
                placeholder="?????????????? ?????? email..."
                // autocomplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                className="button2"
                variant={'outline-success'}
                onClick={click}
              >
                {isLogin ? '??????????' : null}
              </Button>
            </Row>
          </Form>
        )}
      </Card>
    </Container>
  )
})

export default Auth
