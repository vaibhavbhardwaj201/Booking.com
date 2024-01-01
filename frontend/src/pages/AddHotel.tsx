import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";

import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import * as apiClient from "../api-client"

const AddHotel = () => {

    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel added successfully!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            console.log(error);
            showToast({ message: "Error saving Hotel", type: "ERROR" });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    )
}

export default AddHotel