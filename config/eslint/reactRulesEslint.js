//reactConfig.js

import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export const reactConfig = [
    // Кастомные правила
    // React plugin (eslint-plugin-react-hooks)
    {
        extends: [pluginReact.configs.flat.recommended],
        files: ['**/*.{tsx,js,jsx}'],
        name: 'react/override',
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
            'react/require-default-props': 'off',
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
            'react/no-unstable-nested-components': 'error',
        },
    },

    // React Hooks plugin (eslint-plugin-react-hooks)
    {
        name: 'plugin:react-hooks/override',
        extends: [reactHooks.configs['recommended-latest']], // как альтернатива можно было бы вместо extends написать поле plugins: {'jsx-a11y': plugins.reactA11y, },
        files: ['**/*.{tsx,js,jsx}'],
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },

    // JSX a11y plugin (eslint-plugin-jsx-a11y)
    {
        name: 'jsx-a11y/override',
        extends: [jsxA11y.flatConfigs.recommended],
        files: ['**/*.{tsx,js,jsx}'],
        rules: {
            // Отключаем нежелательные правила доступности
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
        },
    },
];
