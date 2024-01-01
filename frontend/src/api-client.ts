import { HotelFormData } from "./forms/manageHotelForm/ManageHotelForm";
import { RegisterFormDataType } from "./pages/Register";
import { SignInFormDataType } from "./pages/SignIn";

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL || "";

// register() is used to register a new user.
export const register = async (formData : RegisterFormDataType) => {
    const response = await fetch(`${APP_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};


// login() is used to login a user.
export const login = async (formData : SignInFormDataType) => {
    const response = await fetch(`${APP_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};


// logout() is used to logout a user.
export const logout = async () => {
    const response = await fetch(`${APP_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
};


// validateToken() is used to check if the user is logged in or not.
export const validateToken = async () => {
    const response = await fetch(`${APP_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Token invalid!");
    }

    // If the response is ok, return the response as JSON.
    return response.json();
};

// addMyHotel() is used to add a new hotel calling api endpoint /api/my-hotels
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${APP_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to add hotel!");
    }

    return data;
};