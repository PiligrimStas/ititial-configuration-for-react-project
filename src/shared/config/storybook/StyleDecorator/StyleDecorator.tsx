import 'app/styles/index.scss';

import type { Decorator } from '@storybook/react';

// Storybook-декоратор, подключающий глобальные стили приложения
export const StyleDecorator: Decorator = (Story) => <Story />;
