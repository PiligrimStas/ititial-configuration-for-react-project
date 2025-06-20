// buildLoaders.ts

import { buildCssLoaders } from './types/loaders/buildCssLoaders';

import type { BuildOptions } from './types/config';
import type webpack from 'webpack';

export function buildLoaders({ useEsbuild = false, isDev }: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader: webpack.RuleSetRule = {
        test: /\.tsx?$/, // .ts и .tsx файлы
        exclude: /node_modules/,
        use: useEsbuild
            ? {
                  loader: 'esbuild-loader',
                  options: {
                      loader: 'tsx', // Для TSX файлов
                      target: 'es2020', // Целевая версия JS
                  },
              }
            : {
                  loader: 'ts-loader', // Если не используем esbuild
              },
    };

    // SVG как React-компонент или как URL
    const svgLoader: webpack.RuleSetRule = {
        test: /\.svg$/,
        oneOf: [
            {
                resourceQuery: /react/, // import icon from './icon.svg?react'
                use: ['@svgr/webpack'],
            },
            {
                type: 'asset/resource', // import icon from './icon.svg'
            },
        ],
    };

    const assetLoader: webpack.RuleSetRule = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        type: 'asset/resource',
    };

    const babelLoader = {
        test: /\.(js|jsx|ts|tsx)$/, // Регулярка: Babel будет обрабатывать все .js, .jsx и .tsx файлы
        exclude: /node_modules/, // Исключаем node_modules — обрабатывать их не нужно (и долго)

        use: {
            loader: 'babel-loader', // Указываем Webpack использовать babel-loader
        },
    };

    const cssLoaders = buildCssLoaders(isDev);

    return [svgLoader, assetLoader, babelLoader, typescriptLoader, ...cssLoaders];
}

// __________________________________________коментарии к настройкам загрузчиков____________________________________________________

// ________________________svgLoader_________________________________________

// oneOf — это массив альтернативных вариантов обработки одного и того же типа файлов.
// Webpack выберет только первое совпавшее правило из oneOf.
// Это помогает избежать конфликтов — как только найдено совпадение, остальное игнорируется.
// resourceQuery: /react/ указывает что нужно использовать svgrLoader для обработки svg. Это сработает если в
// импорте указан путь ?react например Применяется, если в импортируемом пути есть ?react, например: import Icon from './icon.svg?react';
// в этом случае Icon будет импортирован как React компонент.
// Если импортируем просто  import icon from './icon.svg то будет использован встроенныый в webpack 'asset/resource' loader и svg будет
// импортирован просто как svg файл. Так же в d.ts файле нужно указать typescript rfr обрабать .svg?react и просто .svg
