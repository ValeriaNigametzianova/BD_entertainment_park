import React, { useContext, useState } from 'react'
import {
  Button,
  Col,
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
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'

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
    <Navbar className="navbar px-5 container-fluid ">
      <div className="container-fluid p-5">
        <Navbar.Brand
          className="d-flex start-0 navbar-light navbar-brand align-items-center"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(MAIN_ROUTE)
          }}
          href="#"
        >
          <img src={Logo} className=" mx-3 pb-3" alt="logo_img" width={80} />
          <span>Эмоциональные качели</span>
        </Navbar.Brand>

        {(location.pathname === PARK_MAIN_ROUTE ||
          location.pathname === '/') && (
          <Nav>
            {park.selectedTown ? (
              <NavDropdown
                className="d-flex navbar-light navbar-nav nav-link align-items-center"
                variant="outline-success"
                title={park.selectedTown}
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
                  style={{ color: '#ffa100' }}
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
                className=" d-flex navbar-light navbar-nav nav-link align-items-center"
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
                  style={{ color: '#ffa100' }}
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
                className="button2"
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
            <Button
              className="button2 mx-2"
              onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
            >
              Администрирование
            </Button>
          ) : user.role === 'customer' ? (
            <Button
              className="button2 mx-2"
              onClick={() => navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)}
            >
              Мои билеты
            </Button>
          ) : null}
          {user.isAuth ? (
            <Button
              className="button2 mx-2"
              onClick={(e) => {
                e.preventDefault()
                logOut()
                navigate(PARK_MAIN_ROUTE)
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button
              className="button2 mx-2"
              onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}
            >
              Войти
            </Button>
          )}
        </Nav>
      </div>
    </Navbar>
  )
})

export default NavBar
