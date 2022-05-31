import React, { useContext } from 'react'
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
// import Main from "../pages/Main"
import { Row } from 'react-bootstrap'
import AttractionItem from '../components/AttractionItem'
import { observer } from 'mobx-react-lite'
import { customerFetchAttraction } from '../http/parkAPI'

const AttractionList = observer(() => {
  //   const { park } = useContext(Context)
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchAttraction(id).then((data) => setAttractions(data))
  }, [])
  const navigate = useNavigate()
  console.log(attractions)

  return (
    <Row className="d-flex">
      {attractions.parks.map((park) => (
        <AttractionItem key={park.id} park={park} />
      ))}
    </Row>
  )
})

export default AttractionList
