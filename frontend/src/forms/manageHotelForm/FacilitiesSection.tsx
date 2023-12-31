import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { hotelFacilities } from '../../config/hotel-options-config';

const FacilitiesSection = () => {


    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const facilitiesWatch = watch("facilities");

    const isFacilityChecked = (facility: string) => {
        return facilitiesWatch ? facilitiesWatch.includes(facility) : false;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold my-3">
                Hotel Facilities
            </h2>
            <div className="grid grid-cols-4 gap-2">
                {hotelFacilities.map((facility) => (
                    <label
                        className={`flex justify-center items-center cursor-pointer border-2 rounded-md p-2 ${isFacilityChecked(facility) ? 'border-blue-500 text-blue-500 font-bold' : 'border-gray-300 text-gray-500'}`}
                        key={facility}
                    >
                        <input
                            type="checkbox"
                            className="mr-2 hidden"
                            {...register("facilities", {
                                validate: (facilities: string[]) => {
                                    return facilities.length > 0 || "Please select at least one facility"
                                }
                            })}
                            value={facility} />
                        <span>
                            {facility}
                        </span>
                    </label>
                ))}
            </div>
            {errors.facilities && <span className="text-red-500 text-sm">{errors.facilities.message}</span>}
        </div>
    )
}

export default FacilitiesSection