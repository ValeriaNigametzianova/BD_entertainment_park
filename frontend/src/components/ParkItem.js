import React from 'react'
import {Col, Card,Image, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PARK_MAIN_ROUTE } from '../utils/Consts';


 const ParkItem = ({park}) => {
    const navigate = useNavigate();
    console.log(navigate)
  return (
    <Container  onClick={() => navigate(PARK_MAIN_ROUTE + "/" + park.id)}>
      <Row className='mt-2 px-2' style = {{background:"lightgrey", cursor: "pointer", aligne:"centre", borderRadius:"3px"}} border={"light"} >
        {/* <Card  style = {{background:"lightgrey", cursor: "pointer"}} border={"light"}> */}
            <Col md={6} className={"mt-3"}>
              <div >{park.name}</div>
              <div > {park.description} </div>
            </Col>
            <Col md={3}>
            <Image width="100%" height={150} src={park.img}/>
            </Col>
        {/* </Card> */}
      </Row>
    </Container>
  )
}
export default ParkItem