import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export const prettierConfig = [
    // Prettier Plugin
    {
        name: 'prettier/plugin/config',
        plugins: {
            prettier: prettierPlugin,
        },
    },
    // Prettier Config
    {
        name: 'prettier/config',
        rules: {
            ...prettierConfigRules,
            'prettier/prettier': 'error',
        },
    },
];
