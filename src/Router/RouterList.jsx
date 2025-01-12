import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Auth/Login.jsx";
import Register from "../Pages/Auth/Register.jsx";
import AdminLayouts from "../Layouts/AdminLayouts.jsx";
import Dashboard from "../Pages/Admin/Dashboard.jsx";
import Report from "../Pages/Admin/Report.jsx";
import Data from "../Pages/Admin/Data.jsx";
const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/admin",
        element: <AdminLayouts />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "report",
                element: <Report />,
            },
            {
                path: "data",
                element: <Data />,
            },
        ],
    },
]);
export default RouteList;