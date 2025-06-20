import { PageError } from './PageError';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PageError> = {
    title: 'widget/PageError',
    component: PageError,
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component:
                    'PageError widget componet. ErrorBoundry displays this component when error catched', // текст на вкладке docs
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof PageError>;

export const Light: Story = {
    args: {},
};

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
