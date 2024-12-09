import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity } from '../../store/activity/activity.action';
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { switchToUpdateActivity } from '../../store/modal/modal.slice';

const Day = ({ nbDay, onDropActivity }) => {

   const dispatch = useDispatch();
   const currentTripId = useSelector((state) => state.trips.currentTrip.id);

   const activities = useSelector((state) => state.activities.activities);

   const handleActivityDelete = (activityId) => {
      dispatch(deleteActivity({ tripId: currentTripId, activityId }));
   };

   const handleUpdateActivityClick = (activityId) => {
      dispatch(switchToUpdateActivity({ tripId: currentTripId, activityId }));
   };

   const handleDragOver = (e) => {
      e.preventDefault(); // Nécessaire pour permettre le drop
   };

   const handleDrop = (e) => {
      e.preventDefault();
      const activityId = e.dataTransfer.getData('activityId');
      if (activityId) {
         onDropActivity(activityId, nbDay);
      }
   };

   // Filtrer les activités pour le jour spécifique
   const dayActivities = activities.filter(activity => activity.day === nbDay);

   return (
      <div className="bg-white flex flex-col border border-custom-blue rounded-xl w-full lg:w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
         onDrop={handleDrop}
         onDragOver={handleDragOver}
      >
         <div className="rounded-t-xl bg-custom-blue py-2">
            <p className="font-title text-lg text-white text-center">Day {nbDay}</p>
         </div>
         <div className="p-3 flex flex-col gap-4 items-center justify-between min-h-[200px]">
            {dayActivities.length > 0 ? (
               dayActivities.map((activity) => (
                  <div key={activity.id} className="border-0 rounded bg-[#F0F9FB] py-2 px-4 w-full">
                     <div className="flex justify-between items-start">
                        <p className="font-medium text-[17px] pb-1">{activity.name}</p>
                        <div className="flex justify-end">
                           <button onClick={() => handleUpdateActivityClick(activity.id)}><FaPencil className="inline-block text-green-600" /></button>
                        </div>
                     </div>
                     <p className="leading-tight">Location: {activity.location}</p>
                     <p className="leading-tight">Duration: {activity.duration}</p>
                     <div className="flex justify-between items-start">
                        <p className="leading-tight">Price: {activity.price}</p>
                        <div className="flex justify-end">
                           <button onClick={() => handleActivityDelete(activity.id)}><FaTrashCan className="text-custom-wine inline-block" /></button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className="text-gray-500">No activities planned for this day.</p>
            )}
         </div>
      </div >
   );
};

export default Day;

// const Day = ({ nbDay, dayActivities, onDropActivity }) => {

//    const handleDragOver = (e) => {
//       e.preventDefault(); // Nécessaire pour permettre le drop
//    };

//    const handleDrop = (e) => {
//       e.preventDefault();
//       const activityId = e.dataTransfer.getData("activityId");
//       if (activityId) {
//          onDropActivity(activityId, nbDay);
//       }
//    };

//    // Filtre pour obtenir l'activité correspondant au day (nbDay)
//    const movedActivity = dayActivities.find(activity => activity.day === nbDay);
//    useEffect(() => {
//       if (movedActivity) {
//          console.log('Moved activity:', movedActivity);
//       }
//    }, [movedActivity]);

//    return (
//       <div className="bg-white flex flex-col border border-custom-blue rounded-xl w-full lg:w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
//          onDrop={handleDrop}
//          onDragOver={handleDragOver}
//       >
//          <div className="rounded-t-xl bg-custom-blue py-2">
//             <p className="font-title text-lg text-white text-center">Day {nbDay}</p>
//          </div>
//          <div className="p-3 flex flex-col gap-4 items-center justify-between min-h-[200px]">
//             {movedActivity ? (
//                <Activity key={movedActivity.id} {...movedActivity} />
//             ) : (
//                <p>No activities planned for this day.</p>
//             )}
//          </div>
//       </div>
//    );
// };

// export default Day;
