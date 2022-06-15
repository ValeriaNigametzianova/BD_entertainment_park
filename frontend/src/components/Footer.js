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
  Col,
  Image,
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
import '../styles/footer/footer.css'
import '../styles/fonts/brand_name.css'
import '../styles/container/container.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const sourceParks = park
  const navigate = useNavigate()
  const location = useLocation()
  const [tempQuery, setTempQuery] = useState('')
  const path = 'logoPark.png'
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setRole('')
    localStorage.removeItem('token')
  }
  return (
    <Navbar className="footer">
      <Container>
        <Nav>
          <Image
            width="100px"
            object-fit="contain"
            src={process.env.REACT_APP_API_URL + 'logoParkk.png'}
          />
        </Nav>
        <Navbar.Brand
          className="brand_name"
          style={{ color: '#033782', cursor: 'pointer' }}
          onClick={() => navigate(MAIN_ROUTE)}
        >
          Эмоциональные качели
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
})

export default Footer
