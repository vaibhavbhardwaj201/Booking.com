import { RegisterFormDataType } from "./pages/Register";

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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