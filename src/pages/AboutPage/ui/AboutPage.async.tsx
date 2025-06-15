import { lazy } from "react";

// export const AboutPageAsync = lazy(() => import('./AboutPage'));

export const AboutPageAsync = lazy(
    () =>
        new Promise<{ default: React.ComponentType }>((resolve) => {
            setTimeout(() => {
                import("./AboutPage")
                    .then((module) => resolve({ default: module.default }))
                    .catch((error) => {
                        // можно кинуть fallback компонент или просто rethrow
                        console.error("Failed to load AboutPage", error);
                        throw error;
                    });
            }, 1500);
        }),
);
