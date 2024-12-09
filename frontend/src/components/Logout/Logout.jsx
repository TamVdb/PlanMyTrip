import { useDispatch } from 'react-redux';
import { logout } from '../../store/users/user.action';
import { clearCredentials } from '../../store/auth/auth.slice';
import { useNavigate } from "react-router-dom";

const Logout = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         // Calle the API to log out the user in the backend
         await dispatch(logout());
         dispatch(clearCredentials()); // Erase credentials from state
         navigate('/');
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <button onClick={handleLogout} className="text-lg font-medium text-custom-blue hover:text-darkerText px-2">
            Log out
         </button>
      </>
   );
};

export default Logout;