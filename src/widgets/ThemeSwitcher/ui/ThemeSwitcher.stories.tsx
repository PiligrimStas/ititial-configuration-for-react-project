// ThemeSwitcher.stories.tsx
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ThemeSwitcher } from './ThemeSwitcher';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'widget/ThemeSwitcher',
    component: ThemeSwitcher,
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'ThemeSwitcher component from widget UI kit', // текст на вкладке docs
            },
        },
    },
};
export default meta;

// Тип истории
type Story = StoryObj<typeof ThemeSwitcher>;

export const Normal: Story = {
    decorators: [ThemeDecorator()],
    args: {},
};
