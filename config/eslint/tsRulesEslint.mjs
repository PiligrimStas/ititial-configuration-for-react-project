import tseslint from 'typescript-eslint';

export const tsConfig = {
    name: 'ts/recommended-rules-with-override',
    files: ['**/*.{ts,mts,cts,jsx,tsx}'],
    plugins: {
        tseslint,
    },
    extends: [tseslint.configs.recommended],
    rules: {
        '@typescript-eslint/naming-convention': [
            // правило нейминга для переменных здесь юзаем так как из коробки оно не поддерживвает __VARIABLE__ имена которые используются для глобальных переменных
            'error',
            {
                selector: 'variable', // selector указывает имя чего проверяме, может быть и parameter и type и много чего ещё
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'], // допустимые форматы имени
                leadingUnderscore: 'allow', // разрешаем ниженее подчёркивание в начаое
                trailingUnderscore: 'allow', // разрешаем ниженее подчёркивание в к конце
            },
            {
                selector: 'variable', // более специфическая проверка как раз на __VARIABLE__ имена которые используются для глобальных переменных
                format: ['UPPER_CASE'],
                prefix: ['__'], // начинается с двух подчёркиваний (вообще это массив префиксов их может быть несколько)
                suffix: ['__'], // то же что и выше но для конца имени переменно
                filter: {
                    // укзания одник префикса и суффикса мало, ещё нужен и фильтр так как он повышает специфичность
                    regex: '^__.*__$',
                    match: true,
                },
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/no-magic-numbers': [
            'warn', // Показывать предупреждение (не ошибка) при использовании магических чисел
            {
                ignore: [0, 1, -1, 2], // Разрешить часто используемые числа: индексы, счетчики, стандартные значения
                ignoreDefaultValues: true, // Разрешить магические числа в значениях по умолчанию (например: function f(x = 3000))
                ignoreArrayIndexes: true, // Не ругаться на числа в индексах массивов (например: arr[0])
                enforceConst: true, // Требовать, чтобы числовые значения выносились в `const`, а не `let` или `var`
                detectObjects: false, // Не проверять числовые литералы внутри объектов (например: { gap: 8 })
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
};
