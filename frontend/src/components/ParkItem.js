import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_MAIN_ROUTE } from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/parkItem/parkItem.css'

const ParkItem = ({ park }) => {
  const navigate = useNavigate()
  const path = `${park.id}.jpg`
  return (
    <Row
      className="parkItem"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id)}
    >
      <Col>
        <Row className="heading2 colonka_desc">{park.name}</Row>
        <Row className="colonka_desc"> {park.description} </Row>
      </Col>
      <Col>
        <Image width="100%" src={process.env.REACT_APP_API_URL + path} />
      </Col>
    </Row>
  )
}
export default ParkItem
