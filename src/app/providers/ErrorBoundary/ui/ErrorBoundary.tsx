// ErrorBoundary.tsx

import React, { ErrorInfo, ReactNode, Suspense } from 'react';

import { PageError } from 'widgets/ErrorPage/ui/PageError';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    /**
     * Данный месяц есть только у ErrorBoundary
     * Вызывается при возникновении ошибки у потомков во время render, в lifecycle-методах
     * или в конструкторе дочернего компонента.
     * Используется, чтобы обновить состояние перед следующим render() и показать fallback UI.
     */
    static getDerivedStateFromError(error: Error) {
        return { hasError: true }; // если ошибка возникла, менеяет состояние компонента hasError на true после чего компонент ререндерится
    }

    /**
     * Вызывается после того, как ошибка была перехвачена ErrorBoundary (отработал getDerivedStateFromError)
     * Используется для логирования ошибки (например, в Sentry, Datadog и т.п.).
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo, 'hello');
        // Здесь можно отправить ошибку на сервер
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // Если еть ошибка возвращаем компонент ошбики если нет children
            // Поскольку в PageError используются асинхронно подгружаемые файлы переводов,
            // оборачиваем его в Suspense для поддержки lazy-загрузки.
            return (
                <Suspense fallback="">
                    <PageError />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
