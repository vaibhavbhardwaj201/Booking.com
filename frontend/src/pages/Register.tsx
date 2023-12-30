import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client"

export type RegisterFormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { showToast } = useAppContext();

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormDataType>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({ message: "Account created successfully!", type: "SUCCESS" });
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
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", { required: "Please enter your first name" })} />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", { required: "Please enter you last name" })} />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                </label>
            </div>
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
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (value) => {
                            if (!value) {
                                return "Please confirm your password";
                            } else if (watch("password") !== value) {
                                return "Passwords do not match";
                            }
                        }
                    })} />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </label>
            <span>
                <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
                >Register</button>
            </span>
        </form>
    )
}

export default Register