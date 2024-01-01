import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
}

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();

    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((data: HotelFormData) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("description", data.description);
        formData.append("type", data.type);
        formData.append("pricePerNight", data.pricePerNight.toString());
        formData.append("starRating", data.starRating.toString());
        formData.append("adultCount", data.adultCount.toString());
        formData.append("childCount", data.childCount.toString());

        data.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(data.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile);
        });
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500 text-xl">Save</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm