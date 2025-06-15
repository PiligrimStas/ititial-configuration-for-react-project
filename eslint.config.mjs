import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

import { i18nextConfig } from './config/eslint/i18nextRullesEslint.mjs';
import { importConfig } from './config/eslint/importRulesEslint.mjs';
import { jestConfig } from './config/eslint/jestRulesEslint.mjs';
import { jsConfig } from './config/eslint/jsRulesEslint.mjs';
import { promiseConfig } from './config/eslint/promiseRulesEslint.mjs';
import { reactConfig } from './config/eslint/reactRulesEslint.mjs';
import { storybookConfig } from './config/eslint/storybookRulesEslint.mjs';
import { tsConfig } from './config/eslint/tsRulesEslint.mjs';
import { unusedImportsConfig } from './config/eslint/unusedImportRulesEslint.mjs';

const globalsApp = {
    __IS_DEV__: 'readonly', // Указание на то, что переменная только для чтения
    // __API__: 'readonly',
    // __PROJECT__: 'readonly',
};

export default defineConfig([
    globalIgnores([
        'build/**',
        'dist/**',
        'coverage/**',
        'public/**',
        '**/.git/**',
        '**/node_modules/**',
        '**/*.module.scss.d.ts',
    ]),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globalsApp,
            },
        },
    },
    jsConfig,
    importConfig,
    unusedImportsConfig,
    promiseConfig,
    tsConfig,
    ...reactConfig,
    storybookConfig,
    i18nextConfig,
    jestConfig,
    eslintConfigPrettier,
]);
