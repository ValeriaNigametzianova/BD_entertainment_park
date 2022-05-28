import React, { useContext } from 'react';
import {Col, Container, NavLink, Row} from 'react-bootstrap'
import {Context} from "../index";

const ParkMain = () => {
    const park = {id:1, name:"Солнечные зайчики", town:"Москва", description: "Самый счастливый парк"}
    const greenZone = {id:1, name:"Северная сторона",  description: "Самый счастливый парк", ParkId: 1}
console.log(park)
    return (
        <Container>
            <Row>
                <h2>{park.name}</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                    <NavLink>О парке</NavLink>
                </Col>
                <Col md={1}>
                    <NavLink>Характеристики</NavLink>
                </Col>
                <Col md={1}>
                    <NavLink>Аттракционы</NavLink>
                </Col>
                <Col md={1}>
                    <NavLink>Купить билет</NavLink>
                </Col>
            </Row>
            <Row>
                <div>{park.description}</div>
            </Row>
            <Row>
                    <div>{greenZone.name}</div>
                    <div>{greenZone.description}</div>
            </Row>
        </Container>
    );
};

export default ParkMain;