// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }], // { runtime: 'automatic' } нужно что бы ts не ругался на отсутствие import React в файлах с тестами
    ],
    // другие опции...
};
