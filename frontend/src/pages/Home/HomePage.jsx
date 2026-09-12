import { useSelector } from 'react-redux';
import { useSetAtom } from 'jotai';
import Hero from '../../containers/Hero/Hero';
import { openModalAtom } from '../../store/modal/modal.atom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {

   const navigate = useNavigate();

   // Select user from state
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (user) {
         navigate('/trips');
      }
   }, [user, navigate]);

   const openModal = useSetAtom(openModalAtom);

   const handleStartPlanningClick = () => {
      openModal('login');
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