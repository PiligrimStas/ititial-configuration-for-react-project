import { BrowserRouter } from 'react-router-dom';

import type { Decorator } from '@storybook/react';

// Storybook-декоратор, добавляющий Router-контекст
// Используется для компонентов, которые используют useLocation, Link, Navigate и т.п.
export const RouterDecorator: Decorator = (Story) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);
