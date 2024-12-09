import { useId, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActivity } from '../../store/activity/activity.action';
import { closeModal } from '../../store/modal/modal.slice';
import { handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivityUpdateForm = () => {

   // Id for accessibility of the form
   const inputId = useId();

   // State for the values of the form (→ Component controlled)
   const [activityName, setActivityName] = useState('');
   const [activityLocation, setActivityLocation] = useState('');
   const [activityDuration, setActivityDuration] = useState('');
   const [activityPrice, setActivityPrice] = useState('');

   const dispatch = useDispatch();
   const currentTripId = useSelector((state) => state.modal.currentTripId);
   const currentActivityId = useSelector((state) => state.modal.currentActivityId);

   const activity = useSelector((state) => state.activities.activities.find(activity => activity.id === currentActivityId));

   useEffect(() => {
      if (activity) {
         setActivityName(activity.name);
         setActivityLocation(activity.location);
         setActivityDuration(activity.duration);
         setActivityPrice(activity.price);
      }
   }, [activity]);


   const handleUpdateActivity = (e) => {
      e.preventDefault();

      const updatedActivity = {
         name: activityName,
         location: activityLocation,
         duration: activityDuration,
         price: activityPrice
      };

      dispatch(updateActivity({ tripId: currentTripId, activityId: currentActivityId, updatedActivity: updatedActivity }));

      dispatch(closeModal());
   };

   return (
      <>
         <ToastContainer />
         <div className="px-8 pt-16 pb-8">
            <h2 className='text-2xl text-custom-wine font-semibold text-center mb-5'>
               Update an Activity
            </h2>
            <form onSubmit={handleUpdateActivity} className='flex flex-col gap-3'>
               <div>
                  <label htmlFor={inputId + 'name'} className='input-label'>Activity name</label>
                  <input id={inputId + 'name'} type='text' className='input'
                     value={activityName} onChange={(e) => setActivityName(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'location'} className='input-label'>Location</label>
                  <input id={inputId + 'location'} type='text' className='input'
                     value={activityLocation} onChange={(e) => setActivityLocation(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'duration'} className='input-label'>Duration</label>
                  <input id={inputId + 'duration'} type='text' className='input'
                     value={activityDuration} onChange={(e) => setActivityDuration(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'price'} className='input-label'>Price</label>
                  <input id={inputId + 'price'} type='text' className='input'
                     value={activityPrice} onChange={(e) => setActivityPrice(e.target.value)} />
               </div>
               <button type='submit' className='bg-custom-yellow text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-custom-lightYellow transition-200'>
                  Update
               </button>
            </form>
         </div>
      </>
   );
};

export default ActivityUpdateForm;