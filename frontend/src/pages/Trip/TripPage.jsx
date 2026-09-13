import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { getTripAtom, tripStateAtom } from '../../store/trip/trip.atom';
import TripDetails from '../../containers/TripDetails/TripDetails';
import Spinner from '../../components/Spinner/Spinner';

const TripPage = () => {

   const { id } = useParams();
   const getTrip = useSetAtom(getTripAtom);
   const { currentTrip, isLoading, isError, message } = useAtomValue(tripStateAtom);

   useEffect(() => {
      getTrip(id);
   }, [getTrip, id]);

   // if (isLoading) return <Spinner />;

   if (isError) {
      return <div>{message}</div>;
   }

   if (!currentTrip) { return <div>No trip details available</div>; }

   return (
      <>
         <main className="flex flex-col flex-1 mainbg">
            <TripDetails trip={currentTrip} activities={currentTrip.activities} />
         </main>
      </>
   );
};

export default TripPage;