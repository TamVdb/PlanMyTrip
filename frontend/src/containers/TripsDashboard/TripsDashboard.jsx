import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { switchToAddtrip } from '../../store/modal/modal.slice';
import { FaGlobeEurope } from 'react-icons/fa';
import { setCredentials, clearCredentials } from '../../store/auth/auth.slice';
import TripList from '../../components/TripList/TripList';
import TripModal from '../TripModal/TripModal';

const TripsDashboard = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      // Check if user is in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         const userData = JSON.parse(storedUser); // Get user data from localStorage
         dispatch(setCredentials(userData)); // Update user state
      } else {
         dispatch(clearCredentials()); // If user is not logged in, logout
      }
   }, [dispatch]);

   useEffect(() => {
      if (!user) {
         navigate('/');
      }
   }, [user, navigate]);

   const handleAddTripClick = () => {
      dispatch(switchToAddtrip());
   };

   return (
      <>
         <div className="container py-4 flex justify-center">
            <h1 className="font-title font-bold text-custom-wine text-center text-3xl sm:text-5xl lg:text-6xl pt-28 md:w-[900px]">{user && user.username}'s trips</h1>
         </div>

         <div className="container py-4 flex justify-between">
            <div className='flex items-center relative grow'>
               <FaGlobeEurope className="text-darkerText text-xl sm:text-2xl lg:text-3xl mr-2" />
               <h2 className="text-xl sm:text-2xl lg:text-3xl text-darkerText font-semibold font-title pt-2">Dashboard</h2>
               <hr className="absolute w-full h-0.5 bg-gray-400 border-0 top-2/3" />
            </div>
            <div className='bg-custom-lightYellow py-4 px-8 rounded-xl text-center'>
               <h3 className="text-lg sm:text-xl lg:text-2xl text-darkerText font-title">Plan a new Trip</h3>
               <button className="bg-custom-orange text-white py-2 px-5 rounded-xl mt-7 hover:bg-orange-500/80 transition-200"
                  onClick={handleAddTripClick}>Add a Trip</button>
            </div>
         </div>

         <TripModal />

         <div className="container flex flex-row flex-wrap gap-5 py-8">
            <TripList />
         </div>
      </>
   );
};

export default TripsDashboard;