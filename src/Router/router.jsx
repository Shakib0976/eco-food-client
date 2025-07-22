import { createBrowserRouter, } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayouts from "../Layouts/RootLayouts";
import Login from "../Components/Authentication/Login/Login";
import JoinUs from "../Components/Authentication/JoinUs/JoinUs";
import DashboardLayouts from "../Components/Dashboard/DashBoardLayouts";
import UserProfile from "../Pages/DeshBoard/UserProfile";
import CarityRole from "../Pages/DeshBoard/CarityRole";
import PrivateRoutes from "./PrivateRoutes";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [

            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/join',
                Component: JoinUs
            }
        ]
    },




    {
        path: '/dashBoard',
        element: <PrivateRoutes><DashboardLayouts></DashboardLayouts></PrivateRoutes>,
        children: [
            {
                index: true,
                element:<UserProfile></UserProfile>
            },
            {
                path:'request-charity',
                Component:CarityRole
            },
            {
                path:'payment/:ReqEmail',
                Component: Payment,
            },
            {
                path:'transactions',
                Component:PaymentHistory,
            }
        ]
    }
]);
