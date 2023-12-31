import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "Please enter Hotel name" })} />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </label>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", { required: "Please enter City name" })} />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", { required: "Please enter Country name" })} />
                    {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "Please enter Hotel Description" })} />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 w-1/2">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", { required: "Please enter Price Per Night" })} />
                {errors.pricePerNight && <span className="text-red-500 text-sm">{errors.pricePerNight.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 w-1/2">
                Ratings
                <select className="border rounded w-full p-2 text-gray-700 font-normal" {...register("starRating", { required: "Please enter Ratings" })}>
                    <option value="" className="text-sm font-bold">Select Ratings</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating} className="text-sm font-bold">{rating}</option>
                    ))}
                </select>
                {errors.starRating && <span className="text-red-500 text-sm">{errors.starRating.message}</span>}
            </label>
        </div>
    )
}

export default DetailsSection;