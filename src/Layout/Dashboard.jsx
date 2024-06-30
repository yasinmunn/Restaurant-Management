import {  FaCalendar, FaEnvelope, FaHome,  FaList, FaSearch, FaShoppingCart, FaStar, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { FaRectangleList } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart()

    //TODO
    const [isAdmin] = useAdmin();



    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'> <FaHome></FaHome> Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems'> <FaUtensils></FaUtensils> Add Items </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manageItems'> <FaList></FaList> Mange Item </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manage-bookings'> <FaRectangleList></FaRectangleList> Manage Bookings </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'> <FaUsers></FaUsers> All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/useHome'> <FaHome></FaHome> User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'> <FaCalendar></FaCalendar> Reservation </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/review'> <FaStar></FaStar> Add a Review </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'> <FaList></FaList> Payment History </NavLink>
                                </li>
                            </>

                    }



                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'> <FaHome></FaHome> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'> <FaSearch></FaSearch> Menu </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'> <FaEnvelope></FaEnvelope> Contact </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;