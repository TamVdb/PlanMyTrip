import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../store/users/user.atom';
import { clearCredentialsAtom } from '../../store/auth/auth.atom';
import { useNavigate } from "react-router-dom";

const Logout = () => {

   const logout = useSetAtom(logoutAtom);
   const clearCredentials = useSetAtom(clearCredentialsAtom);
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         // Calle the API to log out the user in the backend
         await logout();
         clearCredentials(); // Erase credentials from state
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