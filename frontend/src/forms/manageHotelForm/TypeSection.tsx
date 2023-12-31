import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelTypes } from "../../config/hotel-options-config"

const TypeSection = () => {

    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-bold my-3">
                Hotel Type
            </h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label className={
                        typeWatch === type
                            ? "flex justify-center cursor-pointer border-2 font-bold border-blue-500 rounded-md p-2 text-blue-500"
                            : "flex justify-center cursor-pointer border-2 border-gray-300 rounded-md p-2 text-gray-500"
                    } key={type
                    }>
                        <input

                            type="radio"
                            className="mr-2 hidden"
                            {...register("type", { required: "Please select Hotel Type" })}
                            value={type} />
                        <span>
                            {type}
                        </span>
                    </label>
                ))}
            </div>
            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
        </div>
    )
}

export default TypeSection