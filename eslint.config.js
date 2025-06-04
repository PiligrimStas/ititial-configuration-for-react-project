import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import { i18nextConfig } from './config/eslint/i18nextRullesEslint.js';
import { importConfig } from './config/eslint/importRulesEslint.js';
import { jsConfig } from './config/eslint/jsRulesEslint.js';
import { prettierConfig } from './config/eslint/prettierRulesEslint.js';
import { promiseConfig } from './config/eslint/promiseRulesEslint.js';
import { reactConfig } from './config/eslint/reactRulesEslint.js';
import { storybookConfig } from './config/eslint/storybookRulesEslint.js';
import { tsConfig } from './config/eslint/tsRulesEslint.js';
import { unusedImportsConfig } from './config/eslint/unusedImportRulesEslint.js';

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
                // ...globals.jest,
            },
        },
    },
    ...prettierConfig,
    jsConfig,
    importConfig,
    unusedImportsConfig,
    promiseConfig,
    tsConfig,
    ...reactConfig,
    storybookConfig,
    i18nextConfig,
]);
