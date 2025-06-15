import { useEffect, Suspense } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import ErrorBoundary from 'app/providers/ErrorBoundary/ui/ErrorBoundary';
import { PageError } from 'widgets/ErrorPage/ui/PageError';

// Функция логирования — сюда можно подключить Sentry, Datadog, custom API и т.п.
function logRouteError(error: unknown) {
    if (error instanceof Error) {
        console.error('🔴 Route error:', error);
        // Например:
        // sendToMonitoringService(error);
    } else if (isRouteErrorResponse(error)) {
        const routeError = new Error(`Route error: ${error.status} ${error.statusText}`);
        console.error('🔴 Route error response:', routeError);
        // sendToMonitoringService(routeError);
    } else {
        const unknownError = new Error('Unknown route error');
        console.error('🔴 Unknown route error:', unknownError);
        // sendToMonitoringService(unknownError);
    }
}

export const RouteErrorHandler = () => {
    const error = useRouteError();

    useEffect(() => {
        logRouteError(error);
    }, [error]);

    return (
        <ErrorBoundary>
            <Suspense fallback="">
                <PageError />
            </Suspense>
        </ErrorBoundary>
    );
};

// Этот компонент нужен для кастомной обработки ошибок которые переховатил встроенный в react-router-dom ErrorBoundry, поскольку эти ошибки не попадут в наш глобальный 'app/providers/ErrorBoundary/ui/ErrorBoundary
// мы достаем здесь ошибки пойманые в роутинге с пмомощью useRouteError, обрабатываем их нужным нам образом и Возвращаем на глобальный ErrorBoundary в который как children передаём компонент отображения ошибки
// PageError. Но нужно понимать что здесь PageError это просто компонент с которым нащ ErrorBoundary работает как с любым другим компонентом когда нет ошибки. То есть здесь мым используем ErrorBoundary именно как компонет
// для отображения компонента визуализирующего ошибку, а не для обработки ошибки. Ошибка ловится во встроенном в router erroBoundary, обрабатывается как нам нужно в RouteErrorHandler и на этом путь ошибки
// заканчивается, наш ErrorBoundary никогда не узнает о том что она была, он просто отобарзит нужный нам компонент
