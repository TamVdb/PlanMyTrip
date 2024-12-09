import { useSelector } from 'react-redux';
import Logout from '../../components/Logout/Logout';

const Header = ({ onLoginClick, onSignUpClick }) => {

   // Select user from state
   const { user } = useSelector((state) => state.auth);
   // console.log("User state in Header:", user);

   return (
      <>
         <header className="shadow-lg absolute top-0 left-0 w-full z-10 bg-custom-lightBlue">
            <div className="container py-4 flex justify-between items-center">
               <div className="font-logo text-custom-blue text-2xl sm:text-3xl">Plan My Trip</div>
               <nav className="flex justify-between items-center">
                  <ul className="flex items-center gap-4">
                     {user ? <Logout /> : (
                        <>
                           <li><a href="#" onClick={onLoginClick} className="text-lg font-medium text-custom-blue hover:text-darkerText px-2 py-4">Log in</a></li>
                           <li><a href="#" onClick={onSignUpClick} className="text-lg font-medium text-custom-blue hover:text-darkerText px-2 py-4">Sign up</a></li>
                        </>
                     )}
                  </ul>
               </nav>
            </div>
         </header>
      </>
   );
};

export default Header;