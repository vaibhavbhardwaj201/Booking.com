import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.logout, {
        onSuccess: async () => {
            showToast({ message: "Sign Out successfully!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate('/sign-in');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
    )
}

export default SignOutButton