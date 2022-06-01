import {
  CUSTOMER_ROUTE,
  STUFF_ROUTE,
  ATTRACTIONS_ADMIN_ROUTE,
  BASKET_ROUTE,
  CONFIRMATION_ROUTE,
  EDITING_ATTRACTIONS_ROUTE,
  EDITING_INFO_ROUTE,
  EDITING_MAIN_ROUTE,
  EDITING_TARIF_ROUTE,
  INFO_ADMIN_ROUTE,
  LOGIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  MAIN_ROUTE,
  ORDER_ROUTE,
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
import ParkInfoForAdmin from './pages/ParkInfoForAdmin'
import ParkTarifForAdmin from './pages/ParkTarifForAdmin'
import EditingParkMain from './pages/EditingParkMain'
import EditingParkInfo from './pages/EditingParkInfo'
import EditingParkAttractions from './pages/EditingParkAttractions'
import EditingParkTarif from './pages/EditingParkTarif'
import Order from './pages/Order'
import Basket from './pages/Basket'
import Tickets from './pages/Tickets'
import EmailConfirmation from './pages/EmailConfirmation'
import RecoveryGood from './pages/Recovery good'
import RecoveryBad from './pages/Recovery bad'
import ParkMain from './pages/ParkMain'
import ParkInfo from './pages/ParkInfo'
import ParkTarif from './pages/ParkTarif'
import ParkAttractions from './pages/ParkAttractions'
import Recovery from './pages/Recovery'
import Main from './pages/Main'

export const authRoutes = [
  {
    path: STUFF_ROUTE + MAIN_ADMIN_ROUTE,
    Component: <ParkMainForAdmin />,
  },
  {
    path: STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE,
    Component: <ParkAttractionsForAdmin />,
  },
  //   {
  //     path: STUFF_ROUTE + INFO_ADMIN_ROUTE,
  //     Component: <ParkInfoForAdmin />,
  //   },
  {
    path: STUFF_ROUTE + TARIF_ADMIN_ROUTE,
    Component: <ParkTarifForAdmin />,
  },
  //   {
  //     path: STUFF_ROUTE + EDITING_MAIN_ROUTE,
  //     Component: <EditingParkMain />,
  //   },
  {
    path: STUFF_ROUTE + PARK_MAIN_ROUTE,
    Component: <EditingParkInfo />,
  },
  {
    path: STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE,
    Component: <EditingParkAttractions />,
  },
  {
    path: STUFF_ROUTE + PARK_TARIF_ROUTE,
    Component: <EditingParkTarif />,
  },
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
    path: ORDER_ROUTE,
    Component: <Order />,
  },
  {
    path: BASKET_ROUTE,
    Component: <Basket />,
  },
  {
    path: RECOVERY_ROUTE,
    Component: <Recovery />,
  },
  {
    path: CONFIRMATION_ROUTE,
    Component: <EmailConfirmation />,
  },
  {
    path: RECOVERY_GOOD_ROUTE,
    Component: <RecoveryGood />,
  },
  {
    path: RECOVERY_BAD_ROUTE,
    Component: <RecoveryBad />,
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
