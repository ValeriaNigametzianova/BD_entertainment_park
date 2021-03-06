import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  editInfo,
  stuffFetchGreenZone,
  stuffFetchPark,
  createPark,
  editGreenZone,
  createGreenZone,
} from '../http/parkAPI'
import { MAIN_ADMIN_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import '../styles/container/container.css'
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'

const EditingParkInfo = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  const [name, setName] = useState('')
  const [town, setTown] = useState('')
  const [square, setSquare] = useState(0)
  const [opening_time, setOpTime] = useState(0)
  const [closing_time, setClTime] = useState(0)
  const [description, setDescription] = useState('')
  const [animator, setAnimator] = useState(false)
  const [watersafe, setWatersafe] = useState(false)
  const [zoo, setZoo] = useState(false)
  const [cafe, setCafe] = useState(0)
  const [shop, setShop] = useState(0)
  const [adress, setAdress] = useState('')
  const [gzName, setGzName] = useState('')
  const [gzDescription, setGzDescription] = useState('')
  const [ParkId, setParkId] = useState(0)
  const [GreenZoneId, setGreenZoneId] = useState(0)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data)
    })
    stuffFetchGreenZone().then((data) => {
      setGreenZones(data)
    })
  }, [])

  const updatePark = async () => {
    park.parks.map((data) => {
      let onePark = data.park
      editInfo(onePark).then((data) => {})
    })
  }
  const newPark = async () => {
    park.parks.map((data) => {
      let onePark = data.park
      createPark(onePark).then((data) => {})
    })
  }

  const newGreenZone = async (id) => {
    greenZones.parks.map((data) => {
      let greenZone = data.greenZones[0]
      createGreenZone(greenZone).then((data) => data)
    })
  }
  const updateGreenZone = () => {
    greenZones.parks.map((data) => {
      let greenZone = data.greenZones[0]
      editGreenZone(greenZone).then((data) => data)
    })
  }

  return (
    <Container className="contr">
      <Container className={'d-flex justify-content-center text-light'}>
        <Col>
          {park && park?.parks?.length ? (
            <Form>
              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1 description">
                  ?????????????????????????? ???????????????????? ?? ??????????
                </Form.Label>
              </Form.Group>
              {park.parks.map((el) => {
                el = el.park
                console.log('elll', el)
                return (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="heading3 description">
                      ????????????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="????????????????"
                      value={el?.name}
                      onChange={(e) => setPark({ ...park, name: el?.name })}
                    />
                    <Form.Label className="heading3 description">
                      ??????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="??????????"
                      value={el?.town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                    <Form.Label className="heading3 description">
                      ??????????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="??????????????"
                      value={el?.square}
                      onChange={(e) => setSquare(Number(e.target.value))}
                    />
                    <Form.Label className="heading3 description">
                      ?????????? ????????????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="?????????? ????????????????"
                      value={el?.opening_time}
                      onChange={(e) => setOpTime(Date(e.target.value))}
                    />
                    <Form.Label className="heading3 description">
                      ?????????? ????????????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="dateTime"
                      placeholder="?????????? ????????????????"
                      value={el?.closing_time}
                      onChange={(e) => setClTime(Date(e.target.value))}
                    />
                    <Form.Label className="heading3 description">
                      ????????????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      as="textarea"
                      placeholder="????????????????"
                      rows={7}
                      value={el?.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 description mb-3"
                        type={'checkbox'}
                        label={`?????????????? ????????????????????`}
                        chacked={animator}
                        onChange={(e) => setAnimator(!animator)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 description mb-3"
                        type={'checkbox'}
                        label={`?????????????? ???????????? ??????????????????????`}
                        chacked={watersafe}
                        onChange={(e) => setWatersafe(!watersafe)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 description mb-3"
                        type={'checkbox'}
                        label={`?????????????? ???????????? ?? ??????????????????`}
                        chacked={zoo}
                        onChange={(e) => setZoo(!zoo)}
                      />
                    </Form.Group>

                    <Form.Label className="heading3 description mb-3">
                      ???????????????????? ????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="???????????????????? ????????"
                      value={el?.cafe}
                      onChange={(e) => setCafe(Number(e.target.value))}
                    />

                    <Form.Label className="heading3 description mb-3">
                      ???????????????????? ?????????????????????? ??????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="???????????????????? ?????????????????????? ??????????"
                      value={el?.shop}
                      onChange={(e) => setShop(Number(e.target.value))}
                    />

                    <Form.Label className="heading3 description">
                      ??????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="??????????"
                      value={el?.adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />

                    <Form.Label className="heading3 description">
                      ???????????????? ????????
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="file"
                      onChange={selectFile}
                    />
                  </Form.Group>
                )
              })}
              <Form.Group className="mt-5 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1 description">
                  ???????? ?????? ???????????? ?? ????????????????
                </Form.Label>
              </Form.Group>
              {greenZones?.parks[0]?.greenZones?.length ? (
                greenZones.parks.map((el) =>
                  el.greenZones.map((el) => (
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      {console.log('el', el)}
                      <Form.Label className="heading3 description">
                        ????????????????
                      </Form.Label>
                      <Form.Control
                        className="heading4 mb-3"
                        placeholder="????????????????"
                        value={el?.name}
                        onChange={(e) => setGzName(e.target.value)}
                      ></Form.Control>

                      <Form.Label className="heading3 description">
                        ????????????????
                      </Form.Label>
                      <Form.Control
                        className="heading4 mb-3"
                        as="textarea"
                        rows={7}
                        placeholder="????????????????"
                        value={el?.description}
                        onChange={(e) => setGzDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  ))
                )
              ) : (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="heading3 description">
                    ????????????????
                  </Form.Label>
                  <Form.Control
                    className="heading4"
                    placeholder="????????????????"
                    value={gzName}
                    onChange={(e) => setGzName(e.target.value)}
                  ></Form.Control>

                  <Form.Label className="heading3 description">
                    ????????????????
                  </Form.Label>
                  <Form.Control
                    className="heading4"
                    as="textarea"
                    rows={7}
                    placeholder="????????????????"
                    value={gzDescription}
                    onChange={(e) => setGzDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              )}
              <Row>
                <Col>
                  <Button
                    className="button2"
                    variant="primary"
                    onClick={async () => {
                      navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                    }}
                  >
                    ??????????
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={async () => {
                      await updatePark()
                      updateGreenZone()
                      navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                    }}
                  >
                    ????????????????
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  ?????????????? ????????
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="heading3 description">
                  ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="????????????????"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3 description">??????????</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="??????????"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ??????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="??????????????"
                  value={square}
                  onChange={(e) => setSquare(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ?????????? ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="?????????? ????????????????"
                  value={opening_time}
                  onChange={(e) => setOpTime(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ?????????? ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  type="dateTime"
                  placeholder="?????????? ????????????????"
                  value={closing_time}
                  onChange={(e) => setClTime(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  as="textarea"
                  rows={7}
                  placeholder="????????????????"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description"
                    type={'checkbox'}
                    label={`?????????????? ????????????????????`}
                    chacked={animator}
                    onChange={(e) => setAnimator(!animator)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description"
                    type={'checkbox'}
                    label={`?????????????? ???????????? ??????????????????????`}
                    chacked={watersafe}
                    onChange={(e) => setWatersafe(!watersafe)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description"
                    type={'checkbox'}
                    label={`?????????????? ???????????? ?? ??????????????????`}
                    chacked={zoo}
                    onChange={(e) => setZoo(!zoo)}
                  />
                </Form.Group>

                <Form.Label className="heading3 description">
                  ???????????????????? ????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="???????????????????? ????????"
                  value={cafe}
                  onChange={(e) => setCafe(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ???????????????????? ?????????????????????? ??????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="???????????????????? ?????????????????????? ??????????"
                  value={shop}
                  onChange={(e) => setShop(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3 description">??????????</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="??????????"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                ></Form.Control>
                <Form.Label className="heading3 description">
                  ???????????????? ????????
                </Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="file"
                  onChange={selectFile}
                />
              </Form.Group>

              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1 description">
                  ???????? ?????? ???????????? ?? ????????????????
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="heading3 description">
                  ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="????????????????"
                  value={gzName}
                  onChange={(e) => setGzName(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3 description">
                  ????????????????
                </Form.Label>
                <Form.Control
                  className="heading4"
                  as="textarea"
                  rows={7}
                  placeholder="????????????????"
                  value={gzDescription}
                  onChange={(e) => setGzDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Row>
                <Col>
                  <Button
                    className="button2"
                    variant="primary"
                    onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
                  >
                    ??????????
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="button2"
                    variant="primary"
                    onClick={() => {
                      newPark()
                        .then((data) => newGreenZone(data.id))
                        .then(() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE))
                    }}
                  >
                    ??????????????
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Container>
    </Container>
  )
}

export default EditingParkInfo
