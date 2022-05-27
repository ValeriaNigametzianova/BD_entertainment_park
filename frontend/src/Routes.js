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
    INFO_ADMIN_ROUTE, LOGIN_ROUTE,
    MAIN_ADMIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE,
    PARK_ATTRACTIONS_ROUTE,
    PARK_INFO_ROUTE,
    PARK_MAIN_ROUTE,
    PARK_TARIF_ROUTE,
    RECOVERY_BAD_ROUTE,
    RECOVERY_GOOD_ROUTE,
    RECOVERY_ROUTE, REGISTRATION_ROUTE, TICKETS_ROUTE,
    TARIF_ADMIN_ROUTE
} from "./utils/Consts";

import Auth_for_admin from "./pages/Auth_for_admin";
import Park_main_for_admin from "./pages/Park_main_for_admin";
import Park_attractions_for_admin from "./pages/Park_attractions_for_admin";
import Park_info_for_admin from "./pages/Park_info_for_admin";
import Park_tarif_for_admin from "./pages/Park_tarif_for_admin";
import Editing_park_main from "./pages/Editing_park_main";
import Editing_park_info from "./pages/Editing_park_info";
import Editing_park_attractions from "./pages/Editing_park_attractions";
import Editing_park_tarif from "./pages/Editing_park_tarif";
import Order from "./pages/Order";
import Basket from "./pages/Basket";
import Tickets from "./pages/Tickets";
import EmailConfirmation from "./pages/Email confirmation";
import RecoveryGood from "./pages/Recovery good";
import RecoveryBad from "./pages/Recovery bad";
import Park_main from "./pages/Park_main";
import Park_info from "./pages/Park_info";
import Park_tarifs from "./pages/Park_info";
import Park_attractions from "./pages/Park_attractions";
import Recovery from "./pages/Recovery";
import Main from "./pages/Main";


export const authRoutes = [
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
        path: TARIF_ADMIN_ROUTE,
        Component: Park_tarif_for_admin
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
    {
        path: EDITING_TARIF_ROUTE,
        Component: Editing_park_tarif
    },
]

export const publicRoutes = [
    {
        path: STUFF_ROUTE + LOGIN_ROUTE,
        Component: Auth_for_admin
    },
    {
        path: STUFF_ROUTE + REGISTRATION_ROUTE,
        Component: Auth_for_admin
    },
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
        path: PARK_MAIN_ROUTE + '/id' + PARK_INFO_ROUTE,
        Component: Park_info
    },
    {
        path: PARK_MAIN_ROUTE + '/id' + PARK_ATTRACTIONS_ROUTE,
        Component: Park_attractions
    },
    {
        path: PARK_MAIN_ROUTE + '/id' + PARK_TARIF_ROUTE ,
        Component: Park_tarifs
    }
]