import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold my-3">
                Guests
            </h2>
            <div className="flex flex-col md:flex-row gap-5 w-full bg-gray-200 p-8">
                <label className="text-gray-700 text-sm font-bold flex-1 w-1/2">
                    Adults
                    <input
                        type="number"
                        min={1}
                        value={1}
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("adultCount", { required: "Please enter the value" })} />
                    {errors.adultCount?.message && <span className="text-red-500 text-sm">{errors.adultCount?.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1 w-1/2">
                    Childern
                    <input
                        type="number"
                        min={0}
                        value={0}
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("childCount", { required: "Please enter Price Per Night" })} />
                    {errors.childCount && <span className="text-red-500 text-sm">{errors.childCount.message}</span>}
                </label>
            </div>
        </div>
    )
}

export default GuestsSection