import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home"; // Ensure this path is correct
import Main from "../Layout/Main"; // Import Main component

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
        ]
    },
]);
