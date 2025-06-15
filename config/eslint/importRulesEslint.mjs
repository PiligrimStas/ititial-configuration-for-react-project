import importPlugin from "eslint-plugin-import";

export const importConfig = {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [importPlugin.flatConfigs.recommended],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "import/order": [
            "error",
            {
                groups: [
                    ["builtin", "external"],
                    ["internal"],
                    ["sibling", "parent"],
                    ["index"],
                    ["object", "type"],
                    ["unknown"], // Группа для стилей и других ассетов
                ],
                pathGroups: [
                    // Универсальный алиас
                    { pattern: "@/**", group: "internal" },

                    // FSD-слои
                    { pattern: "app/**", group: "internal" }, // если добавить  position: 'before' в каждый слой то этот сой будет считаться отдельной группй  импортов и будет требаваться пустая строка между ними
                    { pattern: "shared/**", group: "internal" },
                    { pattern: "entities/**", group: "internal" },
                    { pattern: "features/**", group: "internal" },
                    { pattern: "widgets/**", group: "internal" },
                    { pattern: "pages/**", group: "internal" },
                    // { pattern: 'processes/**', group: 'internal', position: 'before' },

                    // Стили
                    {
                        pattern: "*.scss",
                        group: "unknown",
                        patternOptions: { matchBase: true },
                        position: "after",
                    },
                    {
                        pattern: "**/*.module.scss",
                        group: "unknown", // можно internal, если хочешь, но unknown логичнее
                        position: "after",
                        patternOptions: { matchBase: true },
                    },
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                alphabetize: {
                    order: "asc", // сортировать по алфавиту
                    caseInsensitive: true, // игнорировать регистр
                },
                "newlines-between": "always",
                // distinctGroup: true,
                warnOnUnassignedImports: true, // помогает распознать такие импорты import './styles/index.scss'; без него линтер на них вообще никак не реагирует
            },
        ],
        "import/no-unresolved": "off",
    },
};
