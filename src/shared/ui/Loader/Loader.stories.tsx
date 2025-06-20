import { Loader } from './Loader';

import type { Meta, StoryObj } from '@storybook/react';

// Meta-конфигурация компонента
const meta: Meta<typeof Loader> = {
    title: 'shared/Loader',
    component: Loader,
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'Loader component from shared UI kit', // текст на вкладке docs
            },
        },
    },
};
export default meta;

// Тип истории
type Story = StoryObj<typeof Loader>;

export const Normal: Story = {
    args: {},
};
