import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";


export type SignInFormDataType = {
    email: string;
    password: string;
}

const SignIn = () => {

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormDataType>();

    const mutation = useMutation(apiClient.login, {
        onSuccess: () => {
            showToast({ message: "Sign In successfully!", type: "SUCCESS" });
            queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "Please enter you email" })} />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "Please enter you password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        }
                    })} />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </label>
            <span className="flex justify-between">
                <span>
                    Don't have an account? <Link to="/sign-up" className="text-blue-600 underline hover:no-underline">Sign Up</Link>
                </span>
                <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
                    Sign In
                </button>
            </span>
        </form>
    )
}

export default SignIn