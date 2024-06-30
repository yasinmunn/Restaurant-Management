import { useLoaderData } from "react-router-dom";
import SectionTItles from "../../../Components/SectionTItles";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;


const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            // Check if an image file is selected
            if (!data.image || !data.image[0]) {
                toast.error("Please select an image to upload.");
                return;
            }
    
            // Upload the image
            const imageRes = await axiosPublic.post(image_hosting_api, { image: data.image[0] }, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            if (imageRes.data.success) {
                // Prepare menu item data
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: imageRes.data.data.display_url,
                };
    
                // Declare menuRes here
                let menuRes;
    
                // Update the menu item
                menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
    
                // Check if the menu item was updated successfully
                if (menuRes.data.modifiedCount > 0) {
                    toast.success(`${data.name} updated successfully.`);
                    reset(); // Reset the form if needed
                } else {
                    toast.error("Failed to update the menu item.");
                }
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error updating menu item:", error);
            toast.error("An error occurred while updating the menu item.");
        }
    };
    

    return (
        <div>
            <SectionTItles heading={'Update Item'} subHeading={'Reuploading'} />
            <div className='flex justify-center'>
                <form className='p-10 bg-gray-50 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Recipe Name</span>
                            </div>
                            <input
                                defaultValue={name}
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Recipe Name"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div className='flex gap-10'>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled defaultValue={category}>Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="desserts">Desserts</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                defaultValue={price}
                                {...register("price", { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            defaultValue={recipe}
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Recipe Details"
                        ></textarea>
                    </label>
                    <div className='my-4'>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>
                    <button className='btn'>
                        Update Menu Item <FaEdit />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
