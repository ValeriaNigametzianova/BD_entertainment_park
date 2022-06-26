import {
  CUSTOMER_ROUTE,
  STUFF_ROUTE,
  ATTRACTIONS_ADMIN_ROUTE,
  BASKET_ROUTE,
  CONFIRMATION_ROUTE,
  LOGIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  MAIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
  RECOVERY_BAD_ROUTE,
  RECOVERY_GOOD_ROUTE,
  RECOVERY_ROUTE,
  REGISTRATION_ROUTE,
  TICKETS_ROUTE,
  TARIF_ADMIN_ROUTE,
} from './utils/Consts'

import Auth from './pages/Auth'
import ParkMainForAdmin from './pages/ParkMainForAdmin'
import ParkAttractionsForAdmin from './pages/ParkAttractionsForAdmin'
import ParkTarifForAdmin from './pages/ParkTarifForAdmin'
import EditingParkInfo from './pages/EditingParkInfo'
import EditingParkAttractions from './pages/EditingParkAttractions'
import EditingParkTarif from './pages/EditingParkTarif'
import Order from './pages/Order'
import Basket from './pages/Basket'
import Tickets from './pages/Tickets'
import EmailConfirmation from './pages/EmailConfirmation'
import ParkMain from './pages/ParkMain'
import ParkInfo from './pages/ParkInfo'
import ParkTarif from './pages/ParkTarif'
import ParkAttractions from './pages/ParkAttractions'
import Main from './pages/Main'

export const authStuffRoutes = [
  {
    path: STUFF_ROUTE + MAIN_ADMIN_ROUTE,
    Component: <ParkMainForAdmin />,
  },
  {
    path: STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE,
    Component: <ParkAttractionsForAdmin />,
  },
  {
    path: STUFF_ROUTE + TARIF_ADMIN_ROUTE,
    Component: <ParkTarifForAdmin />,
  },
  {
    path: STUFF_ROUTE + PARK_MAIN_ROUTE,
    Component: <EditingParkInfo />,
  },
  {
    path: STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE + '/:id',
    Component: <EditingParkAttractions />,
  },
  {
    path: STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE,
    Component: <EditingParkAttractions />,
  },
  {
    path: STUFF_ROUTE + PARK_TARIF_ROUTE + '/:id',
    Component: <EditingParkTarif />,
  },
  {
    path: STUFF_ROUTE + PARK_TARIF_ROUTE,
    Component: <EditingParkTarif />,
  },
]

export const authCustomerRoutes = [
  {
    path: CUSTOMER_ROUTE + TICKETS_ROUTE,
    Component: <Tickets />,
  },
]

export const publicRoutes = [
  {
    path: STUFF_ROUTE + LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: STUFF_ROUTE + REGISTRATION_ROUTE,
    Component: <Auth />,
  },
  {
    path: CUSTOMER_ROUTE + LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: PARK_MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: PARK_MAIN_ROUTE,
    Component: <Order />,
  },
  {
    path: BASKET_ROUTE + TICKETS_ROUTE,
    Component: <Basket />,
  },
  {
    path: CONFIRMATION_ROUTE,
    Component: <EmailConfirmation />,
  },
  {
    path: PARK_MAIN_ROUTE + '/:id',
    Component: <ParkMain />,
  },
  {
    path: PARK_MAIN_ROUTE + '/:id' + PARK_INFO_ROUTE,
    Component: <ParkInfo />,
  },
  {
    path: PARK_MAIN_ROUTE + '/:id' + PARK_ATTRACTIONS_ROUTE,
    Component: <ParkAttractions />,
  },
  {
    path: PARK_MAIN_ROUTE + '/:id' + PARK_TARIF_ROUTE,
    Component: <ParkTarif />,
  },
]
