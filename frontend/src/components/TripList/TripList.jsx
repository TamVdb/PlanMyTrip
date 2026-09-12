import { useAtomValue, useSetAtom } from 'jotai';
import { getTripsAtom, deleteTripAtom, checkTripAtom, tripStateAtom } from '../../store/trip/trip.atom';
import { switchToUpdatetripAtom } from '../../store/modal/modal.atom';
import { FaLocationDot, FaTrashCan, FaPencil } from "react-icons/fa6";
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const Trip = ({ id, name, description, location, startDate, endDate, days, isChecked }) => {

   const navigate = useNavigate();

   const deleteTrip = useSetAtom(deleteTripAtom);
   const checkTrip = useSetAtom(checkTripAtom);

   // Function to delete a trip
   const handleTripDelete = () => {
      deleteTrip(id);
   };

   // Function to check when a trip is done
   const handleTripDone = () => {
      checkTrip(id);
   };

   const switchToUpdatetrip = useSetAtom(switchToUpdatetripAtom);

   const handleUpdateTripClick = () => {
      switchToUpdatetrip(id);
   };

   // Function to navigate to the trip page
   const handleTripClick = () => {
      navigate(`/trip/${id}`);
   };

   return (
      <>
         <div className={`${isChecked ? 'trip_done' : ''} bg-white flex flex-col border border-custom-blue rounded-xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] gap-4 justify-between`}>
            <div className="rounded-t-xl bg-custom-blue py-6 cursor-pointer" onClick={handleTripClick}>
               <p className="font-semibold font-title text-xl text-white text-center pb-3">{name}</p>
            </div>
            <div className="bg-custom-yellow text-white text-sm px-3 py-1 rounded w-fit mx-auto -mt-8">
               <p className="text-center">{days} days</p>
            </div>
            <div className="px-4 flex justify-between items-start">
               <div className="flex flex-col justify-start">
                  <p className="font-title font-semibold text-lg"><FaLocationDot className="inline-block text-custom-wine text-lg" /> {location}</p>
                  <p className="mt-1">{startDate} → {endDate}</p>
               </div>
               <div className="flex justify-end">
                  <button onClick={handleUpdateTripClick} disabled={isChecked}><FaPencil className="inline-block text-green-600" /></button>
               </div>
            </div>
            <hr className="w-32 h-0.5 mx-auto bg-custom-blue border-0 rounded" />
            <div className="px-4">
               <p>{description}</p>
            </div>
            <div className="py-2 px-4 bg-custom-lightBlue rounded-b-xl flex justify-between">
               <div>
                  <label>
                     <input type="checkbox" checked={isChecked}
                        onChange={handleTripDone} // Gère le changement de la checkbox
                     />
                     <span className="ml-2">
                        {isChecked ? 'Done' : 'Upcoming'}
                     </span>
                  </label>
               </div>
               <button onClick={handleTripDelete}><FaTrashCan className="text-custom-wine" /></button>
            </div>
         </div>
      </>
   );
};

const TripList = () => {

   const getTrips = useSetAtom(getTripsAtom);
   const { trips, isLoading, isError, message } = useAtomValue(tripStateAtom);

   useEffect(() => {

      if (isError) { console.log('Error:', message); }

      getTrips();
   }, [getTrips, isError, message]);

   // if (isLoading) return <Spinner />;

   return (
      <>
         {trips.map(trip => (
            <Trip key={trip.id} {...trip} />
         ))}
      </>
   );
};

export default TripList;