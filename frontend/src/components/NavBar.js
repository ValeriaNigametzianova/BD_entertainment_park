import React, { useContext, useEffect } from 'react'
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
} from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { customerFetchPark } from '../http/parkAPI'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    customerFetchPark(null, 1, 3).then((data) => {
      park.setPark(data.rows)
      park.setTotalCount(data.count)
    })
    customerFetchPark(null, 1, 99999).then((data) => {
      park.setTown([...new Set(data.rows.map((el) => el.town))])
      park.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    // if (park.selectedTown ) {
    customerFetchPark(park.selectedTown, park.page, 3).then((data) => {
      park.setPark(data.rows)
      park.setTotalCount(data.count)
    })
    // }
  }, [park.page, park.selectedTown])

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  console.log('parkClass', park.setSelectedTown)
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={() => navigate(MAIN_ROUTE)}
        >
          Эмоциональные качели
        </Navbar.Brand>
        {/* <Route path="/" element={<Main/>}/> */}
        {/* <NavLink style={{color:"green"}} to={MAIN_ROUTE}> </NavLink> */}
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        {/* <Navbar.Collapse id="navbarScroll"> */}
        {/* <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav> */}
        {}
        <DropdownButton style={{ color: 'bs-dark' }} title="Выберите город">
          <>
            {park.towns.map((town, id) => (
              <Dropdown.Item
                className="dropdown-item"
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
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault()
                park.setSelectedTown(null)
              }}
            >
              Сбросить
            </Dropdown.Item>
          </>
        </DropdownButton>

        {(location.pathname === PARK_MAIN_ROUTE ||
          location.pathname === '/') && (
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Поиск"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Найти</Button>
          </Form>
        )}
        <Nav>
          {user.isAuth ? (
            <Nav className="ml-auto">
              <Button
                variant="outline-success"
                onClick={() => {
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
                variant="outline-success"
                onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}
              >
                Войти
              </Button>
            </Nav>
          )}
          {user.isAuth && user.role === 'stuff' ? (
            <Nav className="ml-auto">
              <Button
                variant="outline-success"
                onClick={() => navigate(STUFF_ROUTE)}
              >
                Мои подчиненные
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
          ) : null}
        </Nav>

        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  )
})

export default NavBar
