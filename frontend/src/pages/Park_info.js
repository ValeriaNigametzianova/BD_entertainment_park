import React from 'react';
import { Col, Row , Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PARK_MAIN_ROUTE, PARK_INFO_ROUTE,PARK_ATTRACTIONS_ROUTE, PARK_TARIF_ROUTE } from '../utils/Consts';

const ParkInfo = () => {
    const park = {id:1, name:"Солнечные зайчики", town:"Москва", description: "Самый счастливый парк"}
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
                <h2 style={{color:"white"}}>Информация</h2>
            </Row>
            <Row>
                <Col md={6}>
                    <Row>
                        <div style={{color:"white"}}>{park.square}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.opening_time}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.closing_time}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.description}</div>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <div style={{color:"white"}}>{park.animators}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.watersafe}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.zoo}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.cafe}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.shops}</div>
                    </Row>
                </Col>
            </Row>
            <Row>
            <h2 style={{color:"white"}}>Адрес</h2>
            </Row>
            <Row>
            <div style={{color:"white"}}>{park.adress}</div>
            </Row>
        </Container>
    )
};

export default ParkInfo;