import i18next from "eslint-plugin-i18next";

export const i18nextConfig = {
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
