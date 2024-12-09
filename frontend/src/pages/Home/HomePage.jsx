import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../containers/Hero/Hero';
import { openModal } from '../../store/modal/modal.slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Select user from state
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (user) {
         navigate('/trips');
      }
   }, [user, navigate]);

   const handleStartPlanningClick = () => {
      dispatch(openModal('login'));
   };

   return (
      <>
         <div className="mainbg">
            <div className="homebgimg relative z-0">
               <Hero onStartPlanningClick={handleStartPlanningClick} />
            </div>
         </div >
      </>
   );
};

export default HomePage;