import React from 'react'
import {Col, Row, Container } from "react-bootstrap";


const TarifItem = ({tarif}) => {
    return (
        <Container>
          <Row className='mt-2 px-2' style = {{background:"lightgrey", cursor: "pointer", aligne:"centre", borderRadius:"3px"}} border={"light"} >
                <Col md={4}>
                  <div >{tarif.name}</div>
                </Col >
                <Col md={4}>
                  <div > {tarif.cost} </div>
                </Col>
                <Col md={4}>
                  <div > {tarif.description} </div>
                </Col>
          </Row>
        </Container>
    )
}
export default TarifItem