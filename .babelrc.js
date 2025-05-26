// .babelcr.js
// Так же эти настройки могли бы жить в конфиге webpack в abelLoader
// {
//     "presets": [
//         "@babel/preset-env", // автоматически подключит все нужные Babel-плагины, чтобы понизить синтаксис до нужной версии JS (на основе targets в package.json или .browserslistrc)
//         "@babel/preset-typescript", // Поддержка TypeScript синтаксиса
//         "@babel/preset-react" // Поддержка JSX
//     ],
//     "plugins": [
//         [
//             "i18next-extract", // Плагин для извлечения ключей перевода из кода
//             {
//                 "locales": ["ru", "en"], // какие языки поддерживаются
//                 "keyAsDefaultValue": true, // ключ = значение по умолчанию
//                 "output": "public/locales/$LOCALE/$NAMESPACE.json"
//             }
//         ]
//     ]
// }

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
    plugins: [
        // [
        //     'i18next-extract',
        //     {
        //         locales: ['ru', 'en'],
        //         keyAsDefaultValue: true,
        //         output: 'public/locales/$LOCALE/$NAMESPACE.json', // ← это точно подхватится
        //     },
        // ],
    ],
};
