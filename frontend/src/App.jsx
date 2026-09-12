import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSetAtom } from 'jotai';
import { switchToLoginAtom, switchToSignupAtom, openModalAtom } from './store/modal/modal.atom';
import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';
import AuthModal from './containers/AuthModal/AuthModal';

function App() {

   // Sélectionne l'utilisateur du state
   const { isSuccess } = useSelector((state) => state.user);

   const switchToLogin = useSetAtom(switchToLoginAtom);
   const switchToSignup = useSetAtom(switchToSignupAtom);
   const openModal = useSetAtom(openModalAtom);

   const handleLoginModal = () => {
      switchToLogin(); // Met à jour le type de modal
      openModal('login'); // Ouvre la modal login
   };

   const handleSignUpModal = () => {
      switchToSignup(); // Met à jour le type de modal
      openModal('signup'); // Ouvre la modal signup
   };

   return (
      <>
         <AuthModal />
         <Header onLoginClick={handleLoginModal} onSignUpClick={handleSignUpModal} />
         <Outlet />
         <Footer />
      </>
   );
}

export default App;