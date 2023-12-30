import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {

    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">BookYourDream.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ?
                        <>
                            <Link to="/my-bookings" className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 cursor-pointer'>My Bookings</Link>
                            <Link to="/my-hotels" className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 cursor-pointer'>My Hotels</Link>
                            <button>Sign out</button>
                        </>
                        :
                        <Link to="/sign-in" className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 cursor-pointer'>Sign In</Link>
                    }
                </span>
            </div>
        </div>
    )
}

export default Header