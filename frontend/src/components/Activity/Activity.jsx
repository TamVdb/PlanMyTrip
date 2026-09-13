import { useAtomValue, useSetAtom } from 'jotai';
import { deleteActivityAtom } from '../../store/activity/activity.atom';
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { switchToUpdateActivityAtom } from '../../store/modal/modal.atom';
import { tripStateAtom } from '../../store/trip/trip.atom';

const Activity = ({ id, name, location, duration, price, day }) => {

   const { currentTrip } = useAtomValue(tripStateAtom);
   const currentTripId = currentTrip.id;
   const switchToUpdateActivity = useSetAtom(switchToUpdateActivityAtom);
   const deleteActivity = useSetAtom(deleteActivityAtom);

   const handleActivityDelete = () => {
      deleteActivity({ tripId: currentTripId, activityId: id });
   };

   const handleUpdateActivityClick = () => {
      switchToUpdateActivity({ tripId: currentTripId, activityId: id });
   };

   const handleDragStart = (e) => {
      e.dataTransfer.setData('activityId', id);
   };

   return (
      <>
         <div className="border-0 rounded bg-[#F0F9FB] py-2 px-4 w-full cursor-pointer"
            onDragStart={handleDragStart}
            draggable
         >
            <div className="flex justify-between items-start">
               <p className="font-medium text-[17px] pb-1">{name}</p>
               <div className="flex justify-end">
                  <button onClick={handleUpdateActivityClick}><FaPencil className="inline-block text-green-600" /></button>
               </div>
            </div>
            <p className="leading-tight">Location: {location}</p>
            <p className="leading-tight">Duration: {duration}</p>
            <div className="flex justify-between items-start">
               <p className="leading-tight">Price: {price}</p>
               <div className="flex justify-end">
                  <button onClick={handleActivityDelete}><FaTrashCan className="text-custom-wine inline-block" /></button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Activity;