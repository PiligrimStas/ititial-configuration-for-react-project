import storybook from 'eslint-plugin-storybook';

export const storybookConfig = {
    // Включаем все правила Storybook
    plugins: {
        storybook,
    },
    rules: {
        ...storybook.configs.recommended.rules,
        ...storybook.configs.csf.rules,
    },
    files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
};
