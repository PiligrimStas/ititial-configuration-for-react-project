//index.tsx

import { AppRouter } from 'app/providers/router';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
const container = document.getElementById('root');
if (!container) throw new Error('root not found');
const root = createRoot(container);

root.render(
    <ThemeProvider>
        <RouterProvider router={AppRouter} />
    </ThemeProvider>,
);
