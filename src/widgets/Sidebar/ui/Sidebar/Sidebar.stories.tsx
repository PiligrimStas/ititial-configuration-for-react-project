import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Sidebar } from './Sidebar';

import type { Decorator, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Sidebar> = {
    title: 'widget/Sidebar',
    component: Sidebar,
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'Sidebar widget component. Displays navigation menu', // текст на вкладке docs
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const FullHeightWrapper: Decorator = (Story) => (
    <div style={{ height: '100vh' }} className="left-side-wrapper">
        <Story />
    </div>
);

export const Light: Story = {
    decorators: [FullHeightWrapper],
    args: {},
};

export const Dark: Story = {
    decorators: [FullHeightWrapper, ThemeDecorator(Theme.DARK)],
    args: {},
};
