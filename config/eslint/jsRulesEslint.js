//jsRulesEslint
import js from '@eslint/js';

export const jsConfig = {
    name: 'js/recommended-rules-with-override',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
        js,
    },
    rules: {
        // Переопределяем базовые правила
        'no-underscore-dangle': 'off', // Разрешаем использование подчеркиваний
        'no-shadow': 'off', // Разрешаем переопределение переменных
        'no-param-reassign': 'off', // Разрешаем изменять параметры функций
        'no-undef': 'off', // Отключаем ошибку о несуществующих переменных
        'no-void': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        // 'no-unused-vars': 'off', // Отключаем ошибку на неиспользуемые переменные
    },
};
