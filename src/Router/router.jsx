import { createBrowserRouter, } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayouts from "../Layouts/RootLayouts";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [

            {
                index: true,
                Component: Home
            }
        ]
    },
]);
