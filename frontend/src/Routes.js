import {
    ATTRACTIONS_ADMIN_ROUTE,
    AUTH_ROUTE, BASKET_ROUTE,
    CONFIRMATION_ROUTE,
    EDITING_ATTRACTIONS_ROUTE,
    EDITING_INFO_ROUTE,
    EDITING_MAIN_ROUTE,
    INFO_ADMIN_ROUTE,
    MAIN_ADMIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE,
    PARK_ATTRACTIONS_ROUTE,
    PARK_INFO_ROUTE,
    PARK_MAIN_ROUTE,
    RECOVERY_BAD_ROUTE,
    RECOVERY_GOOD_ROUTE,
    RECOVERY_ROUTE, TICKETS_ROUTE
} from "./utils/Consts";
import Auth_for_admin from "./pages/Auth_for_admin";
import Park_main_for_admin from "./pages/Park_main_for_admin";
import Park_attractions_for_admin from "./pages/Park_attractions_for_admin";
import Park_info_for_admin from "./pages/Park_info_for_admin";
import Editing_park_main from "./pages/Editing_park_main";
import Editing_park_info from "./pages/Editing_park_info";
import Editing_park_attractions from "./pages/Editing_park_attractions";
import Order from "./pages/Order";
import Basket from "./pages/Basket";
import Tickets from "./pages/Tickets";
import EmailConfirmation from "./pages/Email confirmation";
import RecoveryGood from "./pages/Recovery good";
import RecoveryBad from "./pages/Recovery bad";
import Park_main from "./pages/Park_main";
import Park_info from "./pages/Park_info";
import Park_attractions from "./pages/Park_attractions";
import Recovery from "./pages/Recovery";
import Main from "./pages/Main";


export const authRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth_for_admin
    },
    {
        path: MAIN_ADMIN_ROUTE,
        Component: Park_main_for_admin
    },
    {
        path: ATTRACTIONS_ADMIN_ROUTE,
        Component: Park_attractions_for_admin
    },
    {
        path: INFO_ADMIN_ROUTE,
        Component: Park_info_for_admin
    },
    {
        path: EDITING_MAIN_ROUTE,
        Component: Editing_park_main
    },
    {
        path: EDITING_INFO_ROUTE,
        Component: Editing_park_info
    },
    {
        path: EDITING_ATTRACTIONS_ROUTE,
        Component: Editing_park_attractions
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: ORDER_ROUTE,
        Component: Order
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: TICKETS_ROUTE,
        Component: Tickets
    },
    {
        path: RECOVERY_ROUTE,
        Component: Recovery
    },
    {
        path: CONFIRMATION_ROUTE,
        Component: EmailConfirmation
    },
    {
        path: RECOVERY_GOOD_ROUTE,
        Component: RecoveryGood
    },
    {
        path: RECOVERY_BAD_ROUTE,
        Component: RecoveryBad
    },
    {
        path: PARK_MAIN_ROUTE + '/id',
        Component: Park_main
    },
    {
        path: PARK_INFO_ROUTE + '/id',
        Component: Park_info
    },
    {
        path: PARK_ATTRACTIONS_ROUTE + '/id',
        Component: Park_attractions
    },
]