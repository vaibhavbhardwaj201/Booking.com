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