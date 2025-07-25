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
import FavoritesDonation from "../Pages/Favorites/FavoritesDonation";
import RequestDonation from "../Pages/AddDonation/RequestDonation";
import UpdateDonation from "../Pages/AddDonation/UpdateDonation";
import MYRequest from "../Pages/AddDonation/MYRequest";
import MyPickup from "../Pages/AddDonation/MyPickup";
import RecivedDonation from "../Pages/AddDonation/RecivedDonation";
import MyReview from "../Pages/AddDonation/MyReview";
import ManageUser from "../Pages/AdminManagement.jsx/ManageUser";
import ManageRole from "../Pages/AdminManagement.jsx/ManageRole";
import ManageRequest from "../Pages/AdminManagement.jsx/ManageRequest";
import FeatureDonation from "../Pages/AdminManagement.jsx/FeatureDonation";



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
            {
                path: 'favorites',
                Component: FavoritesDonation,
            },
            {
                path: 'requested-donations',
                Component: RequestDonation,
            },
            {
                path: 'my-donations/updateDonation/:id',
                Component: UpdateDonation
            },
            {
                path: 'my-requests',
                Component: MYRequest,
            },
            {
                path: 'my-pickups',
                Component: MyPickup
            },
            {
                path: 'received-donations',
                Component: RecivedDonation,
            },
            {
                path: 'reviews',
                Component: MyReview
            },
            {
                path: 'manage-users',
                Component: ManageUser
            },
            {
                path: 'manage-role-requests',
                Component: ManageRole
            },
            {
                path: 'manage-requests',
                Component: ManageRequest
            },

            {
                path : 'feature-donations',
                Component : FeatureDonation
            }


        ]
    }
]);
