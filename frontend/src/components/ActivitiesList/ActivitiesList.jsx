import { useAtomValue, useSetAtom } from 'jotai';
import { getActivitiesAtom, activityStateAtom } from '../../store/activity/activity.atom';
import { tripStateAtom } from '../../store/trip/trip.atom';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Activity from '../Activity/Activity';

const ActivitiesList = () => {

   const { currentTrip } = useAtomValue(tripStateAtom);
   const currentTripId = currentTrip.id;

   const getActivities = useSetAtom(getActivitiesAtom);
   const { activities, isLoading, isError, message } = useAtomValue(activityStateAtom);

   useEffect(() => {
      if (isError) { console.log('Error:', message); }

      if (currentTripId) {
         getActivities({ tripId: currentTripId });
      }
   }, [getActivities, currentTripId, isError, message]);

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