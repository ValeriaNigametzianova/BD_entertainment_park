import React, { useContext } from 'react';
import {Col, Container, NavLink, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import {PARK_MAIN_ROUTE, PARK_INFO_ROUTE, PARK_ATTRACTIONS_ROUTE, PARK_TARIF_ROUTE} from "../utils/Consts"

const ParkMain = () => {
    const park = {id:1, name:"Солнечные зайчики", town:"Москва", description: "Самый счастливый парк"}
    const greenZone = {id:1, name:"Северная сторона",  description: "Уютное место для вас и ваших деееей", ParkId: 1}
    const navigate = useNavigate();

    console.log(park)
    return (
        <Container md={9}>
            <Row className='d-flex justify-content-between'>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id)}>О парке</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_INFO_ROUTE)}>Характеристики</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}}  onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_ATTRACTIONS_ROUTE)}>Аттракционы</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green", cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_TARIF_ROUTE)}>Купить билет</div>
                </Col>
            </Row>
            <Row>
                <h2 style={{color:"white"}}>{park.name}</h2>
            </Row>
            <Row>
                <div style={{color:"white"}}>{park.description}</div>
            </Row>
            <Row mt-5>
                    <h2 style={{color:"white"}}>{greenZone.name}</h2>
                    <div style={{color:"white"}}> {greenZone.description}</div>
            </Row>
        </Container>
    );
};

export default ParkMain;