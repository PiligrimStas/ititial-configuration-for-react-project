// i18next-parser.config.js:

module.exports = {
    locales: ['en', 'ru'],
    defaultNamespace: 'common',
    namespace: ['common', 'main', 'about'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{ts,tsx}'],
    createOldCatalogs: true,
    verbose: true,
};
