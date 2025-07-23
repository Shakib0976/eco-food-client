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
import Forbidden from "../Pages/Forbidden";
import AddDonation from "../Pages/AddDonation/AddDonation";
import MyDonation from "../Pages/AddDonation/MyDonation";
import ErrorPage from "../Pages/ErrorPage";
import AdminManageDonation from "../Pages/AdminManageDonation/AdminManageDonation";
import AllDonation from '../Pages/AddDonation/AllDonation'
import DonationDetail from "../Pages/AddDonation/DonationDetail";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: 'errorPage2',
                Component: Forbidden,
            },
            {
                path: 'allDonations',
                element: <PrivateRoutes><AllDonation></AllDonation> </PrivateRoutes>
            },
            {
                path: 'donations/:id',
                element: <PrivateRoutes><DonationDetail></DonationDetail></PrivateRoutes>
            }

        ]
    },




    {
        path: '/dashBoard',
        element: <PrivateRoutes><DashboardLayouts></DashboardLayouts></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <UserProfile></UserProfile>
            },
            {
                path: 'request-charity',
                Component: CarityRole
            },
            {
                path: 'payment/:ReqEmail',
                Component: Payment,
            },
            {
                path: 'transactions',
                Component: PaymentHistory,
            },
            {
                path: 'add-donation',
                Component: AddDonation,
            },
            {
                path: 'my-donations',
                Component: MyDonation,
            },
            {
                path: 'manage-donations',
                Component: AdminManageDonation,
            },


        ]
    }
]);
