// i18next-parser.config.ts

const config = {
    locales: ['en', 'ru'],
    defaultNamespace: 'common',
    namespace: ['common', 'main', 'about'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{ts,tsx}'],
    createOldCatalogs: true,
    verbose: true,
} as const;

export default config;
