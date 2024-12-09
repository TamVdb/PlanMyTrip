import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTrip } from '../../store/trip/trip.action';
import TripDetails from '../../containers/TripDetails/TripDetails';
import Spinner from '../../components/Spinner/Spinner';

const TripPage = () => {

   const { id } = useParams();
   const dispatch = useDispatch();
   const { currentTrip, isLoading, isError, message } = useSelector((state) => state.trips);

   useEffect(() => {
      dispatch(getTrip(id));
   }, [dispatch, id]);

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