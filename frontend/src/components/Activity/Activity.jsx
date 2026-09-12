import { useDispatch, useSelector } from 'react-redux';
import { useSetAtom } from 'jotai';
import { deleteActivity } from '../../store/activity/activity.action';
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { switchToUpdateActivityAtom } from '../../store/modal/modal.atom';

const Activity = ({ id, name, location, duration, price, day }) => {

   const dispatch = useDispatch();
   const currentTripId = useSelector((state) => state.trips.currentTrip.id);
   const switchToUpdateActivity = useSetAtom(switchToUpdateActivityAtom);

   const handleActivityDelete = () => {
      dispatch(deleteActivity({ tripId: currentTripId, activityId: id }));
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