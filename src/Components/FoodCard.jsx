import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart";


const FoodCard = ({ item }) => {
    const { image, price, name, recipe, _id } = item;

    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const [,refetch] = useCart()

    const handleAddToCart = () => {
        if (user && user.email) {
            //Send Cart Item to the database

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image, 
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                if(res.data.insertedId){
                    toast.success(`${name} Added to your cart`)
                    refetch()
                }
            })
             
        }
        else {
            Swal.fire({
                title: "You'r not Logged In",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div class="max-w-xs overflow-hidden  rounded-lg shadow-lg">
            <div class="px-4 py-2">
                <h1 class="text-xl font-bold text-gray-800 uppercase">{name}</h1>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{recipe}</p>
            </div>

            <img class="object-cover w-full h-48 mt-2" src={image} alt="NIKE AIR" />

            <div class="flex items-center justify-between px-4 py-2">
                <h1 class="text-lg font-bold">${price}</h1>
                <button
                    onClick={handleAddToCart}
                    class="px-4 btn py-2 text-md font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-yellow-500 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Add to cart</button>
            </div>
        </div>
    );
};

export default FoodCard;