import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchToAddActivity } from '../../store/modal/modal.slice';
import ActivityModal from '../ActivityModal/ActivityModal';
import ActivitiesList from '../../components/ActivitiesList/ActivitiesList';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGlobeEurope, FaPlus } from 'react-icons/fa';
import Day from '../Day/Day';
import { updateActivityDay } from '../../store/activity/activity.action';

const TripDetails = ({ trip }) => {

   const dispatch = useDispatch();
   const currentTripId = useSelector((state) => state.trips.currentTrip.id);

   const [searchParams, setSearchParams] = useSearchParams();
   const pageParam = searchParams.get('page');
   const firstPage = pageParam ? parseInt(pageParam) : 1;

   const [currentPage, setCurrentPage] = useState(firstPage);
   const daysPerPage = 9;

   if (!trip) { return <div>No trip details available</div>; }

   // Calculate the total number of pages
   const totalPages = Math.ceil(trip.days / daysPerPage);

   // Create an array of numbers from 1 to the total number of days
   const daysArray = [];
   for (let i = 1; i <= trip.days; i++) {
      daysArray.push(i);
   }

   // Set the number of days to be displayed on the current page
   const startIndex = (currentPage - 1) * daysPerPage;
   const endIndex = startIndex + daysPerPage;

   // Get the days to be displayed on the current page
   const visibleDays = daysArray.slice(startIndex, endIndex);

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
         setSearchParams({ page: currentPage + 1 });
      }
   };

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
         setSearchParams({ page: currentPage - 1 });
      }
   };

   const handleAddActivityClick = () => {
      dispatch(switchToAddActivity({ tripId: currentTripId }));
   };

   // Get activities from the store to display in the activities list
   const activities = useSelector((state) => state.activities.activities);

   // Update activity day
   const handleDropActivity = (activityId, day) => {
      dispatch(updateActivityDay({
         tripId: currentTripId,
         activityId,
         updatedDay: { day }
      }));
   };

   return (
      <>
         <div className="container py-4 flex justify-center">
            <h1 className="font-title font-bold text-custom-wine text-center text-3xl sm:text-5xl lg:text-6xl pt-28 md:w-[900px]">{trip.location}</h1>
         </div>

         <div className="container py-4 flex justify-between">
            <div className='flex items-center relative grow'>
               <FaGlobeEurope className="text-darkerText text-xl sm:text-2xl lg:text-3xl mr-2" />
               <h2 className="text-xl sm:text-2xl lg:text-3xl text-darkerText font-semibold font-title pt-2">{trip.name}</h2>
               <div className="bg-custom-yellow text-white font-medium px-3 py-1 rounded w-fit ml-4">
                  <p className="text-center">{trip.days} days</p>
               </div>
               <hr className="absolute w-full h-0.5 bg-gray-400 border-0 top-2/3" />
            </div>
            <div className='bg-custom-lightYellow py-4 px-8 rounded-xl text-center'>
               <Link to='/trips' >
                  <button className="bg-custom-orange text-white py-2 px-5 rounded-xl my-7 hover:bg-orange-500/80 transition-200">Back to Dashboard</button>
               </Link>
            </div>
         </div>

         <ActivityModal />

         <div className="container flex flex-row flex-wrap gap-5 py-8 justify-between items-start">
            <div className="flex flex-col w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33%-1.25rem)] xl:w-[calc(25%-1.25rem)]">
               <div className="flex flex-col bg-custom-blue items-center w-full p-4 justify-between gap-4">
                  <h3 className="font-title font-semibold text-white text-2xl my-8">Things to do</h3>
                  <ActivitiesList />
                  <div className="flex justify-center my-8 w-full">
                     <button className="flex items-center space-x-2" onClick={handleAddActivityClick}>
                        <span className="bg-white p-2 rounded-full flex justify-center items-center">
                           <FaPlus className="text-custom-orange text-xl" />
                        </span>
                        <span className="text-white text-lg tracking-wide">Add an activity</span>
                     </button>
                  </div>
               </div>
            </div>

            <div className="day_list flex flex-row w-full sm:w-[calc(50%-1rem)] lg:w-[calc(67%-1.25rem)] xl:w-[calc(75%-1.25rem)] gap-4 justify-between flex-wrap">
               {/* Colonnes des jours */}
               {visibleDays.map(day => (
                  <Day key={day} nbDay={day} onDropActivity={handleDropActivity} />
               ))}
            </div>
         </div>

         <div className="flex justify-center items-center gap-4 mb-8">
            <button className={`px-3 py-1 rounded font-medium transition-200 
            ${currentPage === 1
                  ? 'bg-custom-lightYellow cursor-not-allowed'
                  : 'bg-custom-yellow  hover:bg-custom-lightYellow'
               }`}
               onClick={handlePreviousPage}
               disabled={currentPage === 1}
            >Previous
            </button>
            <p>
               Page {currentPage} of {totalPages}
            </p>
            <button className={`px-3 py-1 rounded font-medium transition-200 
            ${currentPage === totalPages
                  ? 'bg-custom-lightYellow cursor-not-allowed'
                  : 'bg-custom-yellow  hover:bg-custom-lightYellow'
               }`}
               onClick={handleNextPage}
               disabled={currentPage === totalPages}
            >Next
            </button>
         </div>
      </>
   );
};

export default TripDetails;