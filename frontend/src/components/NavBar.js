import React, { useContext, useState } from 'react'
import {
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  STUFF_ROUTE,
  CUSTOMER_ROUTE,
  TICKETS_ROUTE,
  PARK_MAIN_ROUTE,
  MAIN_ADMIN_ROUTE,
} from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'
import '../styles/container/container.css'
import { useLocation, useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [tempQuery, setTempQuery] = useState('')

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setRole('')
    localStorage.removeItem('token')
  }

  return (
    <Navbar className="navbar">
      <Container>
        <Nav className="justify-content-center z-index:1">
          <Button
            className="button"
            variant="outline-success"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Nav>
        <Navbar.Brand
          className="navbar-light navbar-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(MAIN_ROUTE)
          }}
        >
          Эмоциональные качели
        </Navbar.Brand>

        {(location.pathname === PARK_MAIN_ROUTE ||
          location.pathname === '/') && (
          <Nav>
            {park.selectedTown ? (
              <NavDropdown className="dropdown" title={park.selectedTown}>
                {park.towns.map((town, id) => (
                  <Dropdown.Item
                    key={id}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      park.setSelectedTown(town)
                      park.setPage(1)
                    }}
                  >
                    {town}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  style={{ color: '#6D9DE4' }}
                  onClick={(e) => {
                    e.preventDefault()
                    park.setSelectedTown(null)
                    park.setPage(1)
                  }}
                >
                  Сбросить
                </Dropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                className="dropdown"
                variant="outline-success"
                title="Выберите город"
              >
                {park.towns.map((town, id) => (
                  <Dropdown.Item
                    key={id}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      park.setSelectedTown(town)
                      park.setPage(1)
                    }}
                  >
                    {town}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  style={{ color: '#6D9DE4' }}
                  onClick={(e) => {
                    e.preventDefault()
                    park.setSelectedTown(null)
                    park.setPage(1)
                  }}
                >
                  Сбросить
                </Dropdown.Item>
              </NavDropdown>
            )}
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault()
                park.setPage(1)
              }}
            >
              <FormControl
                type="search"
                placeholder="Поиск"
                className="search"
                aria-label="Search"
                value={tempQuery}
                onChange={(e) => {
                  setTempQuery(e.target.value)
                  park.setSearchQuery(e.target.value)
                  park.setPage(1)
                }}
              />
              <Button
                className="button"
                variant="outline-success"
                onClick={(e) => {
                  park.setSearchQuery(e.target.tempQuery)
                  park.setPage(1)
                }}
              >
                Найти
              </Button>
            </Form>
          </Nav>
        )}

        <Nav>
          {user.role === 'stuff' ? (
            <Nav className="ml-auto">
              <Button
                className="button"
                variant="outline-success"
                onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
              >
                Администрирование
              </Button>
            </Nav>
          ) : user.role === 'customer' ? (
            <Nav className="ml-autoATTRACTION">
              <Button
                className="button"
                variant="outline-success"
                onClick={() => navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)}
              >
                Мои билеты
              </Button>
            </Nav>
          ) : null}
          {user.isAuth ? (
            <Nav className="ml-auto">
              <Button
                className="button"
                variant="outline-success"
                onClick={(e) => {
                  e.preventDefault()
                  logOut()
                  navigate(PARK_MAIN_ROUTE)
                }}
              >
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Button
                className="button"
                variant="outline-success"
                onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}
              >
                Войти
              </Button>
            </Nav>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
})

export default NavBar
