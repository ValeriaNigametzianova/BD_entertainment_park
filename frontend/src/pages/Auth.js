import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, NavLink, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate , useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ADMIN_ROUTE, CUSTOMER_ROUTE, REGISTRATION_ROUTE, STUFF_ROUTE, TICKETS_ROUTE} from "../utils/Consts";
import {Context} from "../index";
import {customerLogin, customerRegistration} from "../http/customerAPI";
import {stuffLogin, stuffRegistration} from "../http/stuffAPI";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate();
    const isLogin = location.pathname === ((STUFF_ROUTE + LOGIN_ROUTE) || (CUSTOMER_ROUTE + LOGIN_ROUTE))
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')



    const click = async () => {
        try {
            let data;
            if (isLogin && location.pathname===(STUFF_ROUTE + LOGIN_ROUTE)) {
                data = await stuffLogin(login, password);
            } 
            else if (isLogin && location.pathname===(CUSTOMER_ROUTE + LOGIN_ROUTE)){
                data = await customerLogin(email);
            }    
            else if(!isLogin &&location.pathname===(STUFF_ROUTE + REGISTRATION_ROUTE))
            {
                data = await stuffRegistration(login, password);
            }
            else if(!isLogin &&location.pathname===(CUSTOMER_ROUTE + REGISTRATION_ROUTE))
            {
                data = await customerRegistration(email);
            }
            user.setUser(user)
            user.setIsAuth(true)
            if (location.pathname===(CUSTOMER_ROUTE + LOGIN_ROUTE)){
                navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)
            }
            else if(location.pathname===(STUFF_ROUTE + LOGIN_ROUTE)){
                navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
            }
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                {isLogin ?
                    <Row>
                        <Col className="d-flex justify-content-center">
                        <div  style={{  cursor:"pointer"}}onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}>Администратор</div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                        <div style={{ cursor:"pointer"}}  onClick={() => navigate(CUSTOMER_ROUTE + LOGIN_ROUTE)}>Посетитель</div>
                        </Col>
                    </Row>
                    :
                    <Row >
                        <Col className="d-flex justify-content-center">
                            <div style={{ cursor:"pointer"}} onClick={() => navigate(STUFF_ROUTE + REGISTRATION_ROUTE)}>Администратор</div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <div style={{ cursor:"pointer"}} onClick={() => navigate(CUSTOMER_ROUTE + REGISTRATION_ROUTE)}>Посетитель</div>
                        </Col>
                    </Row>
                }
                {location.pathname===((STUFF_ROUTE + REGISTRATION_ROUTE)|| (STUFF_ROUTE + LOGIN_ROUTE)) ?
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш login..."
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ?
                                <div >
                                    Нет аккаунта? <div style={{ cursor:"pointer"}} onClick={() => navigate(STUFF_ROUTE + REGISTRATION_ROUTE)}>Зарегистрируйся!</div>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <div style={{ cursor:"pointer"}} onClick={() => navigate(STUFF_ROUTE + LOGIN_ROUTE)}>Войдите!</div>
                                </div>
                            }
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Row>
                    </Form>
                :
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <div onClick={() => navigate(CUSTOMER_ROUTE + REGISTRATION_ROUTE)}>Зарегистрируйся!</div>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <div onClick={() => navigate(CUSTOMER_ROUTE + LOGIN_ROUTE)}>Войдите!</div>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
                }
            </Card>
        </Container>
    );
});

export default Auth;