import React from 'react';
import SectionTItles from '../../../Components/SectionTItles';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // Image Uploading in the hosting
        const res = await axiosPublic.post(image_hosting_api, { image: data.image[0] }, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        let menuRes;
        if (res.data.success) {
            // Send data with url to database
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            };
            menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
        }
        console.log(res.data);

        if (menuRes && menuRes.data.insertedId) {
            toast.success(`${data.name} Added`);
        }
    };

    return (
        <div className=''>
            <SectionTItles heading='Add an Item' subHeading="What's New?"></SectionTItles>
            <div className=' flex justify-center '>
                <form className=' p-10 bg-gray-50 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Recipe Name</span>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
                        </label>
                    </div>
                    <div className='flex gap-10'>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                <option disabled defaultValue={'value'}>Select a Category</option>
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
                                {...register("price", { required: true })}
                                type="number" placeholder="Price" className="input input-bordered w-full " />
                        </label>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea  {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </label>
                    <div className='my-4'>
                        <input  {...register("image")} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn'>
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
