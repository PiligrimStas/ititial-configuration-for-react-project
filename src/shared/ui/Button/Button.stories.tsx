// Button.stories.tsx

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ThemeButton } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

// Meta-конфигурация компонента
const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        // в это поле мы можем добавить пропсы компонета управлять которыми сможем интрактивно прямв в storybook
        theme: {
            control: 'inline-radio', // или 'select'
            options: Object.values(ThemeButton), // ['clear', 'outline', 'primary']
            description: 'Вариант отображения кнопки',
            table: {
                category: 'Appearance',
                defaultValue: { summary: 'primary' },
            },
        },
    },
    tags: ['autodocs'], // нужно что бы появилась вкладка docs
    parameters: {
        docs: {
            description: {
                component: 'Button component from shared UI kit', // текст на вкладке docs
            },
        },
    },
};
export default meta;

// Тип истории
type Story = StoryObj<typeof Button>;

// Примеры историй
export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR,
    },
};

export const Outline: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.OUTLINE,
    },
};

export const OutlineDark: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)], // мы можем переключать темы как глобально в interface storybook для всех story и локально как здесь. Локальный вызов декоратора имеет приоритет над глобальным
};

// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'app/providers/ThemeProvider';
// import { Button, ThemeButton } from './Button';

// export default {
//     title: 'shared/Button',
//     component: Button,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof Button>;

// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//     children: 'Text',
// };

// export const Clear = Template.bind({});
// Clear.args = {
//     children: 'Text',
//     theme: ThemeButton.CLEAR,
// };

// export const Outline = Template.bind({});
// Outline.args = {
//     children: 'Text',
//     theme: ThemeButton.OUTLINE,
// };

// export const OutlineDark = Template.bind({});
// OutlineDark.args = {
//     children: 'Text',
//     theme: ThemeButton.OUTLINE,
// };
// OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
