import { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAtomValue, useSetAtom } from 'jotai';
import { updateTrip } from '../../store/trip/trip.action';
import { modalAtom, closeModalAtom } from '../../store/modal/modal.atom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const parseDate = (dateString) => {
   const [day, month, year] = dateString.split('/');
   return new Date(`${month}/${day}/${year}`);
};

const TripUpdateForm = () => {

   // Id for accessibility of the form
   const inputId = useId();

   const dispatch = useDispatch();
   const { currentTripId } = useAtomValue(modalAtom);
   const closeModal = useSetAtom(closeModalAtom);
   const trip = useSelector((state) => state.trips.trips.find(trip => trip.id === currentTripId));

   // State for the values of the form (→ Component controlled)
   // Initialisées directement depuis `trip` : ce composant est remonté à chaque
   // ouverture (via key={currentTripId} dans TripModal), trip est donc déjà
   // disponible au montage.
   const [tripName, setTripName] = useState(trip?.name ?? '');
   const [tripDescription, setTripDescription] = useState(trip?.description ?? '');
   const [tripLocation, setTripLocation] = useState(trip?.location ?? '');
   const [tripStartDate, setTripStartDate] = useState(() => (trip ? parseDate(trip.startDate) : null));
   const [tripEndDate, setTripEndDate] = useState(() => (trip ? parseDate(trip.endDate) : null));

   const handleUpdateTrip = (e) => {
      e.preventDefault();

      // Récupérer les dates de début et de fin du formulaire
      const rawStartDate = tripStartDate;
      const rawEndDate = tripEndDate;

      // Récupérer le temps en millisecondes entre les dates de début et de fin
      const timeDiff = rawEndDate.getTime() - rawStartDate.getTime();

      // Calculer le nombre de jours entre les dates de debut et de fin
      const days = Math.floor(timeDiff / (1000 * 3600 * 24));

      // Check if the trip duration exceeds 365 days
      if (days > 365) {
         handleError('The trip duration cannot exceed 365 days.');
         return;
      }

      const updatedTrip = {
         name: tripName,
         description: tripDescription,
         location: tripLocation,
         startDate: rawStartDate.toLocaleDateString(),
         endDate: rawEndDate.toLocaleDateString(),
         days: days + 1
      };

      dispatch(updateTrip({ id: currentTripId, updatedTrip }));

      closeModal();
   };

   return (
      <>
         <ToastContainer />
         <div className="px-8 pt-16 pb-8">
            <h2 className='text-2xl text-custom-wine font-semibold text-center mb-5'>
               Update your trip
            </h2>
            <form onSubmit={handleUpdateTrip} className='flex flex-col gap-3'>
               <div>
                  <label htmlFor={inputId + 'name'} className='input-label'>Trip name</label>
                  <input id={inputId + 'name'} type='text' className='input'
                     value={tripName} onChange={(e) => setTripName(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'description'} className='input-label'>Description</label>
                  <textarea id={inputId + 'description'} className='input' rows={3}
                     value={tripDescription} onChange={(e) => setTripDescription(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'location'} className='input-label'>Location</label>
                  <input id={inputId + 'location'} type='text' className='input'
                     value={tripLocation} onChange={(e) => setTripLocation(e.target.value)} />
               </div>
               <div>
                  <label htmlFor={inputId + 'start-date'} className='input-label'>Start date</label>
                  <DatePicker
                     placeholderText="Click to select a date"
                     id={inputId + 'start-date'}
                     showIcon
                     selected={tripStartDate}
                     onChange={(date) => setTripStartDate(date)}
                     dateFormat="dd/MM/yyyy"
                     fixedHeight
                     className="input"
                  />
               </div>
               <div>
                  <label htmlFor={inputId + 'end-date'} className='input-label'>End date</label>
                  <DatePicker
                     placeholderText="Click to select a date"
                     id={inputId + 'end-date'}
                     showIcon
                     selected={tripEndDate}
                     minDate={tripStartDate}
                     onChange={(date) => setTripEndDate(date)}
                     dateFormat="dd/MM/yyyy"
                     fixedHeight
                     className="input"
                  />
               </div>
               <button type='submit' className='bg-custom-yellow text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-custom-lightYellow transition-200'>
                  Update
               </button>
            </form>
         </div>
      </>
   );
};

export default TripUpdateForm;