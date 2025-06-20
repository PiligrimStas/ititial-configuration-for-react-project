import { Navbar } from './Navbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'Navbar widget component.', // текст на вкладке docs
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Light: Story = {
    args: {},
};
