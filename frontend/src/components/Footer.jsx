import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { MAIN_ROUTE } from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/footer/footer.css'
import '../styles/fonts/fonts.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo_black.svg'

const Footer = observer(() => {
  const navigate = useNavigate()
  return (
    <Navbar className="footer px-5">
      {/* <Container className="d-flex px-0"> */}
      <div className="container_footer">
        <img src={Logo} className=" mx-3 start-0" alt="logo_img" width={70} />
        <div className="brand_name start-50">© Эмоциональные качели, 2022</div>
      </div>
      {/* </Container> */}
    </Navbar>
  )
})

export default Footer
