
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    if (isLoading) {
        return <div className='flex items-center min-h-[70vh] justify-center text-3xl'>Loading...</div>;
    }
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi  {
                    user?.displayName ? user.displayName : ''
                }, </span>
                Welcome Back!
            </h2>
            <div className='flex gap-10 items-center justify-center my-6'>
            <div className="stats shadow flex gap-10 items-center justify-center border ">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className='text-5xl'></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats.revenue}</div>


                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaUsers className='text-5xl'></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.user}</div>
                    
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                      <FaBook className='text-5xl'></FaBook>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-5xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value"> {stats.orders} </div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AdminHome;