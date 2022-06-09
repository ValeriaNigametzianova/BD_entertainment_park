import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavLink,
  DropdownButton,
  DropdownItem,
  DropdownToggle,
  Spinner,
  Row,
  NavDropdown,
  Col,
} from 'react-bootstrap'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  STUFF_ROUTE,
  CUSTOMER_ROUTE,
  TICKETS_ROUTE,
  PARK_MAIN_ROUTE,
  MAIN_ADMIN_ROUTE,
} from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import '../styles/fonts/brand_name.css'
import '../styles/container/container.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { customerFetchPark, searchPark } from '../http/parkAPI'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const sourceParks = park
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setRole('')
    localStorage.removeItem('token')
  }
  console.log('userIsAuth', user.isAuth)
  // const searchParks = useMemo(() => {
  //   console.log('working')
  //   console.log(park.parks)
  //   if (park.searchPark) {
  //     console.log('lyamv')
  //     return park.searchPark.filter((onePark) => {
  //       console.log(onePark.name.toLowerCase().includes(searchQuery))
  //       onePark.name.toLowerCase().includes(searchQuery)
  //     })
  //   }
  // }, [searchQuery, park.parks])

  const searchParks = useMemo(() => {
    return park.parks.filter((onePark) =>
      onePark.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, park.parks])

  return (
    <Navbar className="navbar" expand="lg">
      {user.isAuth ? (
        <Container>
          <Button onClick={() => navigate(-1)}>Назад</Button>
          <Navbar.Brand
            className="brand_name"
            style={{ color: '#033782', cursor: 'pointer' }}
            onClick={() => navigate(MAIN_ROUTE)}
          >
            Эмоциональные качели
          </Navbar.Brand>

          {location.pathname === STUFF_ROUTE + PARK_MAIN_ROUTE && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Поиск"
                className="search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                className="button"
                variant="outline-success"
                onClick={(e) => {
                  // setSearchQuery(e.target.value)
                  park.setPark(searchParks)
                }}
              >
                Найти
              </Button>
            </Form>
          )}

          <Nav>
            <Nav className="ml-auto">
              <div>{user.user.login}</div>
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
            {user.isAuth && user.role === 'stuff' ? (
              <Nav className="ml-auto">
                <Button
                  className="button"
                  variant="outline-success"
                  onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
                >
                  Администрирование
                </Button>
              </Nav>
            ) : user.isAuth && user.role === 'customer' ? (
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
          </Nav>
        </Container>
      ) : (
        <Container>
          <Col>
            <Button onClick={() => navigate(-1)}>Назад</Button>
          </Col>
          <Col className="d-flex">
            <Navbar.Brand
              className="brand_name"
              style={{ color: '#033783', cursor: 'pointer' }}
              onClick={() => navigate(MAIN_ROUTE)}
            >
              Эмоциональные качели
            </Navbar.Brand>

            {park.selectedTown ? (
              <NavDropdown
                style={{ color: '#6D9DE4' }}
                variant="outline-success"
                title={park.selectedTown}
              >
                {park.towns.map((town, id) => (
                  <Dropdown.Item
                    key={id}
                    //   active={}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      park.setSelectedTown(town)
                    }}
                  >
                    {town}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault()
                    park.setSelectedTown(null)
                  }}
                >
                  Сбросить
                </Dropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                style={{ color: '#6D9DE4' }}
                className="align-baseline"
                variant="outline-success"
                title="Выберите город"
              >
                {park.towns.map((town, id) => (
                  <Dropdown.Item
                    key={id}
                    //   active={}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      park.setSelectedTown(town)
                    }}
                  >
                    {town}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault()
                    park.setSelectedTown(null)
                  }}
                >
                  Сбросить
                </Dropdown.Item>
              </NavDropdown>
            )}
          </Col>
          {(location.pathname === PARK_MAIN_ROUTE ||
            location.pathname === '/') && (
            <Form className="d-flex justify-content-center align-items-center">
              <FormControl
                type="search"
                placeholder="Поиск"
                className="search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                className="button"
                variant="outline-success"
                onClick={(e) => {
                  // setSearchQuery(e.target.value)
                  park.setSearchPark(searchParks)
                }}
              >
                Найти
              </Button>
            </Form>
          )}
          <Nav>
            <Nav className="ml-auto">
              <Button
                className="button"
                variant="outline-success"
                onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}
              >
                Войти
              </Button>
            </Nav>
            {/* {user.isAuth && user.role === 'stuff' ? (
              <Nav className="ml-auto">
                <Button
                  variant="outline-success"
                  onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
                >
                  Администрирование
                </Button>
              </Nav>
            ) : user.role === 'customer' ? (
              <Nav className="ml-auto">
                <Button
                  variant="outline-success"
                  onClick={() => navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)}
                >
                  Мои билеты
                </Button>
              </Nav>
            ) : null} */}
          </Nav>
        </Container>
      )}
    </Navbar>
  )
})

export default NavBar
