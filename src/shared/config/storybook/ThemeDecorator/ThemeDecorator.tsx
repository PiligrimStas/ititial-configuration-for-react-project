// ThemeDecorator.tsx — Storybook-декоратор для применения темы (light / dark) к компонентам

import { Theme, ThemeProvider } from 'app/providers/ThemeProvider'; // ThemeProvider нужен тем компонентам котоые непосредственно его вызывают наприер ThemeSwitcher

import type { Decorator } from '@storybook/react';

/**
 * ThemeDecorator — фабрика-декоратор для Storybook, которая добавляет тему оформления (light/dark)
 * к каждой истории компонента.
 *
 * 🔧 Поддерживает два режима работы:
 *
 * 1. Глобальное использование через preview.ts:
 *    - Когда декоратор используется как `ThemeDecorator()` без аргументов,
 *    - Тема берётся из глобального контекста Storybook (`context.globals.theme`)
 *    - Это позволяет менять тему через Toolbar (вкладка наверху Storybook UI)
 *
 * 2. Локальное (персонализированное) использование в отдельных stories:
 *    - Когда декоратор используется как `ThemeDecorator(Theme.DARK)` или `Theme.LIGHT`,
 *    - Тема задаётся явно и не зависит от выбранного значения в Toolbar
 *    - Это удобно для визуальных тестов, showcase-сценариев и фиксации конкретных тем
 *
 * 📌 Оборачивает каждую story в <div className="app [theme]">,
 *     чтобы применить соответствующие стили (например, через SCSS классы `.app.dark` / `.app.light`)
 *
 * 💡 Почему сделано как фабрика:
 *    - Универсальность: один и тот же декоратор работает как глобально, так и на уровне story
 *    - Снижение дублирования: не нужно писать два разных декоратора
 *    - Совместимость с глобальным тулбаром и ручным управлением
 */
export const ThemeDecorator = (forcedTheme?: Theme): Decorator => {
    const Decorated: Decorator = (Story, context) => {
        // Используем либо переданную тему, либо читаем из глобального контекста Storybook
        const theme = forcedTheme ?? (context.globals.theme as Theme);

        // Оборачиваем компонент в div с CSS-классом темы (например: .app.dark)
        return (
            <ThemeProvider initialTheme={theme}>
                <div className={`app ${theme}`}>{Story()}</div>
            </ThemeProvider>
        );
    };

    // Присваиваем displayName для удобства в React DevTools и устранения ошибки линтера
    (Decorated as unknown as { displayName: string }).displayName = forcedTheme
        ? `ThemeDecorator(${forcedTheme})`
        : 'ThemeDecorator(dynamic)';

    return Decorated;
};
