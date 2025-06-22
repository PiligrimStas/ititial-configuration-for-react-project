// jest.visual.config.ts
// Конфигурация Jest специально для визуальных тестов с Puppeteer
// Изолирована от unit/integration тестов, чтобы запускать визуальные тесты отдельной командой

import type { Config } from 'jest';

const config: Config = {
    // Корневая папка для поиска файлов (относительно этого конфига)
    rootDir: '../../',

    // Шаблон для поиска файлов с визуальными тестами
    // Будут запускаться только файлы вида *.visual.test.ts / *.visual.test.tsx
    testMatch: ['<rootDir>/**/*(*.)visual.test.[tj]s?(x)'],

    // Трансформация файлов для Jest
    // Здесь используется babel-jest с отдельным конфигом, чтобы обрабатывать ts/tsx/js/jsx
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
    },

    // Для визуальных тестов часто не требуется дополнительный setup (можно добавить при необходимости)
    setupFilesAfterEnv: [],

    // Увеличенный таймаут для долгих визуальных тестов (большие компоненты, сложные стори)
    testTimeout: 20000,

    // Дополнительно можно добавить:
    // snapshotResolver: 'config/jest/visual.snapshot-resolver.js',
    // reporters: ['default', 'jest-image-snapshot/reporter'],
};

export default config;
