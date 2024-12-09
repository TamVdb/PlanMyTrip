import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../store/activity/activity.action';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Activity from '../Activity/Activity';

const ActivitiesList = () => {

   const dispatch = useDispatch();
   const currentTripId = useSelector((state) => state.trips.currentTrip.id);

   const { activities, isLoading, isError, message } = useSelector((state) => state.activities);

   useEffect(() => {
      if (isError) { console.log('Error:', message); }

      if (currentTripId) {
         dispatch(getActivities({ tripId: currentTripId }));
      }
   }, [dispatch, currentTripId, isError, message]);

   // if (isLoading) return <Spinner />;

   if (!activities || activities.length === 0) {
      return <p>No activities available</p>;
   }

   //Only show initial activities before dnd with day:0 in DB
   const initialActivities = activities.filter(activity => activity.day === 0);

   return (
      <>
         {initialActivities.map(activity => (
            <Activity key={activity.id} {...activity} />
         ))}
      </>
   );
};

export default ActivitiesList;