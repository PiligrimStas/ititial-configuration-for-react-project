// AppRouter.tsx

import App from 'app/App';
import { createBrowserRouter } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: routeConfig,
    },
]);

export default AppRouter;
