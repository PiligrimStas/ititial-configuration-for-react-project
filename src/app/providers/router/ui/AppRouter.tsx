// AppRouter.tsx

import { createBrowserRouter } from 'react-router-dom';

import App from 'app/App';

import { RouteErrorHandler } from './RouteErrorHandler';
import { routeConfig } from '../config/routeConfig';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <RouteErrorHandler />,
        children: routeConfig,
    },
]);

export default AppRouter;
