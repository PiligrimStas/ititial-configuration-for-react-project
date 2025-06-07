import { lazy } from 'react';

export const MainPageAsync = lazy(
    async () =>
        new Promise<{ default: React.ComponentType }>((resolve) => {
            setTimeout(() => {
                import('./MainPage')
                    .then((module) => resolve({ default: module.default }))
                    .catch((error) => {
                        console.error('Failde to load MainPage', error);
                        throw error;
                    });
            });
        }),
);
