import React, { useEffect, useState } from 'react';
import { Col, Row , Container} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { customerFetchOnePark } from '../http/parkAPI';
import { PARK_MAIN_ROUTE, PARK_INFO_ROUTE,PARK_ATTRACTIONS_ROUTE, PARK_TARIF_ROUTE } from '../utils/Consts';

const ParkInfo = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [park, setPark] = useState()
    useEffect(()=>{
        customerFetchOnePark(id).then(data => setPark(data))
    },[])
    console.log(park)
    return (
        <Container md={9}>
            <Row className='d-flex justify-content-between'>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id)}>О парке</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' +id + PARK_INFO_ROUTE)}>Характеристики</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green",cursor:"pointer"}}  onClick={() => navigate(PARK_MAIN_ROUTE + '/' +id + PARK_ATTRACTIONS_ROUTE)}>Аттракционы</div>
                </Col>
                <Col md={1}>
                    <div style={{color:"green", cursor:"pointer"}} onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)}>Купить билет</div>
                </Col>
            </Row>
            <Row>
                <h2 style={{color:"white"}}>Информация</h2>
            </Row>
            <Row>
                <Col md={6}>
                    <Row>
                        <div style={{color:"white"}}>Площадь: {park?.square}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.opening_time}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.closing_time}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.description}</div>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <div style={{color:"white"}}>{park?.animators}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.watersafe}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.zoo}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.cafe}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park?.shops}</div>
                    </Row>
                </Col>
            </Row>
            <Row>
            <h2 style={{color:"white"}}>Адрес</h2>
            </Row>
            <Row>
            <div style={{color:"white"}}>{park?.adress}</div>
            </Row>
        </Container>
    )
};

export default ParkInfo;