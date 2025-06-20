import { AppLink, AppLinkTheme } from './AppLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
        children: 'Text',
    },

    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'AppLink component from shared UI kit', // текст на вкладке docs
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY,
    },
};

export const Secondary: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
    },
};

export const Red: Story = {
    args: {
        theme: AppLinkTheme.RED,
    },
};

// export const PrimaryDark = Template.bind({});
// PrimaryDark.args = {
//     children: 'Text',
//     theme: AppLinkTheme.PRIMARY,
// };
// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const SecondaryDark = Template.bind({});
// SecondaryDark.args = {
//     children: 'Text',
//     theme: AppLinkTheme.SECONDARY,
// };
// SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const RedDark = Template.bind({});
// RedDark.args = {
//     children: 'Text',
//     theme: AppLinkTheme.RED,
// };
// RedDark.decorators = [ThemeDecorator(Theme.DARK)];
