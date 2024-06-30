import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home"; // Ensure this path is correct
import Main from "../Layout/Main"; // Import Main component
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUser from "../pages/Dashboard/AllUsers/AllUser";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdatedItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '', // This is the default child route for '/'
                element: <Home />,
            },
            {
                path: 'menu', // This will match '/menu'
                element: <Menu />
            },
            {
                path: 'order/:category', // This will match '/order/:category'
                element: <Order />
            },
            {
                path: 'login', // This will match '/login'
                element: <Login />
            },
            {
                path: 'sign-up', // This will match '/sign-up'
                element: <SignUp />
            },
            {
                path: 'secret', // This will match '/secret'
                element: <PrivateRoutes />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            //User Path
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path:'payment',
                element:<Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            //Admin Path
            {
                path: 'addItems',
                element: <AdminRoute> <AddItems></AddItems> </AdminRoute>
            },

            {
                path: 'users',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
            },
            {
                path: 'adminHome',
                element: <AdminRoute> <AdminHome></AdminHome> </AdminRoute>
            },
            {
                path: 'userHome',
                element: <AdminRoute> <UserHome></UserHome> </AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:7001/menu/${params.id}`)
            }

        ]
    }

]);
