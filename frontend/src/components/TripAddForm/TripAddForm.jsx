import { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrip } from '../../store/trip/trip.action';
import { closeModal } from '../../store/modal/modal.slice';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TripAddForm = () => {

   // Id for accessibility of the form
   const inputId = useId();

   // State for the values of the form (→ Component controlled)
   const [tripName, setTripName] = useState('');
   const [tripDescription, setTripDescription] = useState('');
   const [tripLocation, setTripLocation] = useState('');
   const [tripStartDate, setTripStartDate] = useState(null);
   const [tripEndDate, setTripEndDate] = useState(null);
   const [mapPosition, setMapPosition] = useState(null);
   const [suggestions, setSuggestions] = useState([]);

   // Function to get suggestions from Nominatim API
   const getSuggestions = async (query) => {
      if (!query) {
         setSuggestions([]);
         return;
      }
      try {
         const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&accept-language=en&limit=2`);
         setSuggestions(response.data);
      } catch (error) {
         console.error('Error fetching suggestions:', error);
      }
   };

   // Handle location change and fetch suggestions
   const handleLocationChange = (e) => {
      const query = e.target.value;
      setTripLocation(query);
      getSuggestions(query);
   };

   // Handle selecting a suggestion
   const handleSuggestionClick = (suggestion) => {
      const cleanLocation = suggestion.display_name.split(',')[0];
      setTripLocation(cleanLocation);
      setMapPosition([suggestion.lat, suggestion.lon]);
      setSuggestions([]); // Clear suggestions
   };

   // Dispatch to add a new trip
   const dispatch = useDispatch();

   // Handle the submission of the form
   const handleAddTrip = (e) => {
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

      const newTrip = {
         name: tripName,
         description: tripDescription,
         location: tripLocation,
         startDate: rawStartDate.toLocaleDateString(),
         endDate: rawEndDate.toLocaleDateString(),
         days: days + 1,
         coordinates: mapPosition
      };

      // Send the form data to the parent
      dispatch(addTrip(newTrip));

      dispatch(closeModal());

      // Form reset
      setTripName('');
      setTripDescription('');
      setTripLocation('');
      setTripStartDate(null);
      setTripEndDate(null);
      setMapPosition(null);
   };

   return (
      <>
         <ToastContainer />
         <div className="px-8 pt-16 pb-8">
            <h2 className='text-2xl text-custom-wine font-semibold text-center mb-5'>
               Add a new Trip
            </h2>
            <form onSubmit={handleAddTrip} className='flex flex-col gap-3'>
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
                     value={tripLocation} onChange={handleLocationChange} />
                  {/* Suggestion dropdown */}
                  {suggestions.length > 0 && (
                     <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto z-10">
                        {suggestions.map((suggestion, index) => (
                           <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion)}>
                              {suggestion.display_name}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
               <div>
                  {/* Display map if coordinates are available */}
                  {mapPosition && (
                     <MapContainer center={mapPosition} zoom={10} style={{ height: "200px", width: "100%" }}>
                        <TileLayer
                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapPosition}>
                           <Popup>
                              {tripLocation}
                           </Popup>
                        </Marker>
                     </MapContainer>
                  )}
               </div>
               <div>
                  <label htmlFor={inputId + 'start-date'} className='input-label'>Start date</label>
                  <DatePicker
                     placeholderText="Click to select a date"
                     id={inputId + 'start-date'}
                     showIcon
                     selected={tripStartDate}
                     onChange={(date) => {
                        setTripStartDate(date);
                        if (tripEndDate && date > tripEndDate) {
                           setTripEndDate(date);
                        }
                     }}
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
                  Add a trip
               </button>
            </form>
         </div>
      </>
   );
};

export default TripAddForm;