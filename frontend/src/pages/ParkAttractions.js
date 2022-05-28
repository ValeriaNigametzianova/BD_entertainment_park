import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { customerFetchAttraction, customerFetchOnePark } from '../http/parkAPI';
import { PARK_ATTRACTIONS_ROUTE, PARK_INFO_ROUTE, PARK_MAIN_ROUTE, PARK_TARIF_ROUTE } from '../utils/Consts';

const ParkAttractions = () => {
    const [park, setPark] = useState ()
    const [attraction, setAttraction] = useState()
    const {id} = useParams()
    useEffect(()=>{
        customerFetchOnePark(id).then(data => setPark(data))
        customerFetchAttraction(id).then(data=>setAttraction(data))
    },[])
    const navigate = useNavigate();

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
                <h2 style={{color:"white"}}>{attraction.name}</h2>
            </Row>
            <Row>
                <div style={{color:"white"}}>{attraction.description}</div>
            </Row>
            <Row mt-5>
                    <h2 style={{color:"white"}}>Характеристики</h2>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <div style={{color:"white"}}>{park.hight}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.age_limitation}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.weight_limitation}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.height_limitation}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.max_quantity_people}</div>
                    </Row>
                    <Row>
                        <div style={{color:"white"}}>{park.active}</div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ParkAttractions;