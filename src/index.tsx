// index.tsx

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { AppRouter } from 'app/providers/router';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import 'shared/config/i18n/i18n';

const container = document.getElementById('root');
if (container === null) throw new Error('root not found');
const root = createRoot(container);

root.render(
    <ErrorBoundary>
        <ThemeProvider>
            <RouterProvider router={AppRouter} />
        </ThemeProvider>
    </ErrorBoundary>,
);
