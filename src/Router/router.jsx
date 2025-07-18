import { createBrowserRouter, } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayouts from "../Layouts/RootLayouts";
import Login from "../Components/Authentication/Login/Login";
import JoinUs from "../Components/Authentication/JoinUs/JoinUs";



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
]);
