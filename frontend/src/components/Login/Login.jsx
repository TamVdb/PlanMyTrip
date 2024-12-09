import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/users/user.action';
import { setCredentials } from '../../store/auth/auth.slice';
import { handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onSwitchToSignup = () => { }, onSuccessfulConnection = () => { } }) => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLoginSubmit = async (e) => {
      e.preventDefault();

      if (!username || !password) {
         handleError('Please fill out all fields.');
         return;
      }

      try {
         // Dispatch login action
         const resultAction = await dispatch(login({ username, password })).unwrap();

         // Check if login was successful
         dispatch(setCredentials(resultAction)); // Update credentials
         onSuccessfulConnection();
         navigate('/trips', { state: { user: resultAction.user } });
      } catch (error) {
         handleError(error);
      }
   };


   return (
      <>
         <ToastContainer />
         <div className="px-8 pt-16 pb-8">
            <h2 className="text-2xl text-custom-wine font-semibold font-title text-center mb-5">
               Log in to save your trips
            </h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
               <div>
                  <label htmlFor="username" className="input-label text-darkerText">Username</label>
                  <input id="username" type="text" className="input" onChange={(e) => setUsername(e.target.value)} />
               </div>
               <div>
                  <label htmlFor="password" className="input-label text-darkerText">Password</label>
                  <div className="relative">
                     <input className="input pr-8" id="password" onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
                     {showPassword ? (
                        <FaEye
                           className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     ) : (
                        <FaEyeSlash
                           className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     )}
                  </div>
               </div>
               <button className="bg-custom-yellow text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-custom-lightYellow transition-200">
                  Log in
               </button>
            </form>
            <p className="text-center text-darkerText mt-6"
               onClick={onSwitchToSignup}>Don't have an account yet? <span className='cursor-pointer font-medium text-custom-orange hover:text-custom-orange-700 underline'>Sign up</span></p>
         </div>
      </>
   );
};

export default Login;