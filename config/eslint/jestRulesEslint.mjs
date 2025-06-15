// config/eslint/jestRulesEslint.js
import pluginJest from "eslint-plugin-jest";

export const jestConfig = {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    plugins: {
        jest: pluginJest,
    },
    languageOptions: {
        globals: pluginJest.environments.globals.globals,
    },
    rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/valid-expect": "error",
        "jest/prefer-to-be": "warn",
        "jest/consistent-test-it": ["warn", { fn: "test", withinDescribe: "it" }],
    },
};
