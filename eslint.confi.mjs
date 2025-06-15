import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import { configs, plugins } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import i18next from "eslint-plugin-i18next";
import prettierPlugin from "eslint-plugin-prettier";
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";

const projectRoot = path.resolve(".");
const tsconfigPath = path.resolve(projectRoot, "tsconfig.json");
const gitignorePath = path.resolve(projectRoot, ".gitignore");

// Глобальные переменные
const globals = {
    __IS_DEV__: "readonly", // Указание на то, что переменная только для чтения
    // __API__: 'readonly',
    // __PROJECT__: 'readonly',
};

const jsConfig = [
    // ESLint Recommended Rules
    {
        name: "js/config",
        ...js.configs.recommended,
    },
    // Stylistic Plugin
    plugins.stylistic,
    // Import X Plugin
    plugins.importX,
    // Airbnb Base Recommended Config
    ...configs.base.recommended,
    {
        // Добавляем правило для порядка импортов
        rules: {
            "import-x/order": [
                "error",
                {
                    groups: [
                        ["builtin", "external"],
                        ["internal"],
                        ["sibling", "parent"],
                        ["index"],
                        ["unknown"], // Группа для стилей и других ассетов
                    ],
                    pathGroups: [{ pattern: "@/**", group: "internal" }],
                    alphabetize: {
                        order: "asc", // сортировать по алфавиту
                        caseInsensitive: true, // игнорировать регистр
                    },
                    "newlines-between": "always",
                },
            ],
            // Отключаем следующие правила из eslint-plugin-import-x
            "import-x/no-unresolved": "off", // Отключаем проверку на алиасы
            "import-x/prefer-default-export": "off", // Отключаем предпочтение default export

            // Переопределяем базовые правила для JavaScript
            "no-underscore-dangle": "off", // Разрешаем использование подчеркиваний
            "no-shadow": "off", // Разрешаем переопределение переменных
            "no-param-reassign": "off", // Разрешаем изменять параметры функций
            // 'no-undef': 'off', // Отключаем ошибку о несуществующих переменных
            // 'no-unused-vars': 'off', // Отключаем ошибку на неиспользуемые переменные
        },
    },
];

const unusedImportsConfig = {
    name: "unused-imports/plugin/config",
    plugins: {
        "unused-imports": unusedImports, // Правильное подключение плагина
    },
    rules: {
        "unused-imports/no-unused-imports": "error", // Применяем правило для неиспользуемых импортов
    },
};

const reactConfig = [
    // React Plugin
    plugins.react,
    // React Hooks Plugin
    plugins.reactHooks,
    // React JSX A11y Plugin
    plugins.reactA11y,
    // Airbnb React Recommended Config
    ...configs.react.recommended,
    {
        name: "react/override",
        rules: {
            "react/react-in-jsx-scope": "off", // отключаем требование import React. (По умолчаниею требует импорт React)
            "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".tsx"] }], // разрешённые расширения для JSX. По уммолчаниею нет js файлов
            "react/require-default-props": "off", // отключаем требование defaultProps

            // 'react/jsx-props-no-spreading': 'warn', // предупреждение при spread-пропсах (вроде уже идёт из коробки)
            // 'react/function-component-definition': 'off', // стиль объявления компонентов — на усмотрение (по умаолчанию требует стрелочные)
            "react/function-component-definition": [
                // разрешаем только стрелочные функции для реакт компонентов
                "error",
                {
                    namedComponents: "arrow-function",
                    unnamedComponents: "arrow-function",
                },
            ],
            // 'react/no-array-index-key': 'off', // можно использовать индекс как ключ в map (по умолчанию запрещает использовать индексы)
            "react/jsx-max-props-per-line": ["error", { maximum: 4 }], // максимум 4 пропса в строке
            "react/no-unstable-nested-components": "error", // ошибка при вложенных компонентах

            // React Hooks (из eslint-plugin-react-hooks)
            // 'react-hooks/rules-of-hooks': 'error', // правила хуков React (есть из коробки)
            // 'react-hooks/exhaustive-deps': 'error', // следить за зависимостями эффектов (есть из коробки)

            // Отключаем правила доступности
            "jsx-a11y/no-static-element-interactions": "off", // отключаем требование интерактивности
            "jsx-a11y/click-events-have-key-events": "off", // отключаем требование key для click
        },
    },
];

const typescriptConfig = [
    // TypeScript ESLint Plugin
    plugins.typescriptEslint,
    // Airbnb Base TypeScript Config
    ...configs.base.typescript,
    // Airbnb React TypeScript Config
    ...configs.react.typescript,
    // Добавляем переопределение правил для TypeScript
    {
        name: "typescript/override",
        plugins: {
            "@typescript-eslint": typescriptEslintPlugin,
        },
        rules: {
            "no-underscore-dangle": "off",
            "@typescript-eslint/naming-convention": [
                // правило нейминга для переменных здесь юзаем так как из коробки оно не поддерживвает __VARIABLE__ имена которые используются для глобальных переменных
                "error",
                {
                    selector: "variable", // selector указывает имя чего проверяме, может быть и parameter и type и много чего ещё
                    format: ["camelCase", "UPPER_CASE", "PascalCase"], // допустимые форматы имени
                    leadingUnderscore: "allow", // разрешаем ниженее подчёркивание в начаое
                    trailingUnderscore: "allow", // разрешаем ниженее подчёркивание в к конце
                },
                {
                    selector: "variable", // более специфическая проверка как раз на __VARIABLE__ имена которые используются для глобальных переменных
                    format: ["UPPER_CASE"],
                    prefix: ["__"], // начинается с двух подчёркиваний (вообще это массив префиксов их может быть несколько)
                    suffix: ["__"], // то же что и выше но для конца имени переменно
                },
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
            ],
        },
    },
    {
        languageOptions: {
            parser,
            parserOptions: {
                project: [tsconfigPath],
                tsconfigRootDir: projectRoot,
                sourceType: "module",
            },
        },
    },
];

const prettierConfig = [
    // Prettier Plugin
    {
        name: "prettier/plugin/config",
        plugins: {
            prettier: prettierPlugin,
        },
    },
    // Prettier Config
    {
        name: "prettier/config",
        rules: {
            ...prettierConfigRules,
            "prettier/prettier": "error",
        },
    },
];

const i18nextConfig = {
    name: "i18next/plugin/config",
    plugins: {
        i18next, // Подключаем плагин i18next
    },
    rules: {
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: ["role", "data-testid"],
            },
        ], // Применяем правило для i18next
    },
};

const storybookConfig = [
    {
        // Включаем все правила Storybook
        plugins: {
            storybook,
        },
        rules: {
            ...storybook.configs.recommended.rules,
            ...storybook.configs.csf.rules,
        },
        files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
    },
];
export { projectRoot, gitignorePath };

export default [
    // Ignore .gitignore files/folder in eslint
    includeIgnoreFile(gitignorePath),
    // Javascript Config
    ...jsConfig,
    // React Config
    ...reactConfig,
    // TypeScript Config
    ...typescriptConfig,
    // Prettier Config
    ...prettierConfig,
    // Добавляем конфиг для unused-imports
    unusedImportsConfig,

    i18nextConfig,
    {
        files: ["config/**/*.ts", "eslint.config.*"],
        rules: {
            "import-x/no-extraneous-dependencies": "off",
        },
    },

    ...storybookConfig,
    {
        languageOptions: {
            globals, // Здесь мы добавляем глобальные переменные через languageOptions
        },
    },
];
