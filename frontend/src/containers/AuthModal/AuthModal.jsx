import { useDispatch, useSelector } from 'react-redux';
import { closeModal, switchToLogin, switchToSignup } from '../../store/modal/modal.slice';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';

const AuthModal = () => {

   const dispatch = useDispatch();
   const { isOpen, modalType } = useSelector((state) => state.modal);

   if (!isOpen) return null; // Modal is not visible

   const handleCloseModal = () => {
      dispatch(closeModal());
   };

   const handleSwitchToLogin = () => {
      dispatch(switchToLogin());
   };

   const handleSwitchToSignup = () => {
      dispatch(switchToSignup());
   };

   return (
      <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-700/50">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-md w-[90%] sm:w-auto mx-auto bg-white">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 font-semibold rounded-full bg-custom-blue text-white w-7 h-7">X</button>

            {/* Affiche Login ou Signup en fonction de modalType */}
            {modalType === 'login' && <Login onSwitchToSignup={handleSwitchToSignup} onSuccessfulConnection={handleCloseModal} />}
            {modalType === 'signup' && < Signup onSwitchToLogin={handleSwitchToLogin} onSuccessfulConnection={handleCloseModal} />}
         </div>
      </div>
   );
};

export default AuthModal;