import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

//* Import pour le store Redux
import store from './store/store';
import { Provider } from 'react-redux';

//* Mise en place du routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';

const Router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <StrictMode>
         <RouterProvider router={Router} />
      </StrictMode>
   </Provider>
);
