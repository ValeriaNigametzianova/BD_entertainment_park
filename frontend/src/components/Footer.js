import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { MAIN_ROUTE } from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/footer/footer.css'
import '../styles/fonts/fonts.css'
import '../styles/container/container.css'
import { useNavigate } from 'react-router-dom'

const Footer = observer(() => {
  const navigate = useNavigate()
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
