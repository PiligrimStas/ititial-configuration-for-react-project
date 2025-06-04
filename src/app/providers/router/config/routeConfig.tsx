// routeConfig.tsx

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

import type { RouteObject } from 'react-router-dom';

// Перечисление маршрутов
export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
}

// Маппинг маршрутов на пути
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
};

// Конфигурация маршрутов
export const routeConfig: RouteObject[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <MainPage />,
    },
    {
        path: RoutePath[AppRoutes.ABOUT],
        element: <AboutPage />,
    },
];
