import HomePage from './pages/Home/HomePage';
import TripsDashboardPage from './pages/Trips/TripsDashboardPage';
import TripPage from './pages/Trip/TripPage';
import App from './App';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

   const { user } = useSelector((state) => state.auth);

   return user ? children : <Navigate to='/' replace />;
};


const routes = [
   {
      path: '/',
      element: <App />,
      children: [
         {
            index: true,
            element: <HomePage />
         },
         {
            path: 'trips',
            element: (
               <ProtectedRoute>
                  <TripsDashboardPage />
               </ProtectedRoute>
            )
         },
         {
            path: 'trip/:id',
            element: (
               <ProtectedRoute>
                  <TripPage />
               </ProtectedRoute>
            )
         }
      ]
   }
];

export default routes;