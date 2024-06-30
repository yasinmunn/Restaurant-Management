import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth()
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi  {
                    user?.displayName ? user.displayName : ''
                }, </span>
                Welcome Back!
            </h2>
        </div>
    );
};

export default UserHome;