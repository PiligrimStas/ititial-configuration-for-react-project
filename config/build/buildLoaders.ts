// buildLoaders.ts
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { BuildOptions } from './types/config';
import type webpack from 'webpack';

// Функция генерации набора загрузчиков для стилей
function getStyleLoaders(isModule: boolean, isDev: boolean): webpack.RuleSetUseItem[] {
    return [
        // В DEV режиме используем style-loader для внедрения стилей в <style> теги
        // В PROD режиме выносим стили в отдельные файлы через MiniCssExtractPlugin
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

        // Если файл модульный (*.module.scss), подключаем генерацию типов через css-modules-dts-loader
        ...(isModule
            ? [
                  {
                      loader: 'css-modules-dts-loader',
                      options: {
                          namedExport: true, // Генерируем именованные экспорты вместо дефолтного
                          camelCase: true, // Преобразуем имена классов в camelCase
                          banner: '// Auto-generated. Do not edit.', // Добавляем баннер в .d.ts файлы
                          mode: isDev ? 'emit' : 'verify', // В dev режиме генерируем файлы, в prod проверяем
                      },
                  },
              ]
            : []),

        // Основной css-loader
        {
            loader: 'css-loader',
            options: isModule
                ? {
                      esModule: true, // Используем es-модули для корректной работы импорта
                      modules: {
                          namedExport: true, // Экспортируем каждый класс отдельно
                          exportLocalsConvention: 'as-is', // Оставляем оригинальные имена классов
                          localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]', // Уникализация классов
                      },
                  }
                : undefined, // Для глобальных стилей специальные настройки не нужны
        },

        // sass-loader для поддержки SCSS синтаксиса
        'sass-loader',
    ];
}

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

    // Загрузчик для модульных SCSS файлов (*.module.scss)
    const scssModuleLoader: webpack.RuleSetRule = {
        test: /\.module\.s[ac]ss$/i,
        use: getStyleLoaders(true, isDev),
    };

    // Загрузчик для глобальных SCSS файлов (всех остальных *.scss)
    const scssGlobalLoader: webpack.RuleSetRule = {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i, // Исключаем модульные файлы
        use: getStyleLoaders(false, isDev),
    };

    const babelLoader = {
        test: /\.(js|jsx|ts|tsx)$/, // Регулярка: Babel будет обрабатывать все .js, .jsx и .tsx файлы
        exclude: /node_modules/, // Исключаем node_modules — обрабатывать их не нужно (и долго)

        use: {
            loader: 'babel-loader', // Указываем Webpack использовать babel-loader

            // теперь эти настройки живут в babel.config.json
            // options: {
            //     presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
            //     plugins: [
            //         [
            //             'i18next-extract',
            //             {
            //                 locales: ['ru', 'en'],
            //                 keyAsDefaultValue: true,
            //             },
            //         ],
            //     ],
            // },
        },
    };

    return [
        svgLoader,
        assetLoader,
        babelLoader,
        typescriptLoader,
        scssModuleLoader,
        scssGlobalLoader,
    ];
}

// __________________________________________коментарии к настройкам загрузчиков____________________________________________________
// {
//     loader: 'css-modules-dts-loader',
//     options: {
//         // указывает на то что нужно генерировать именнованые экспорты в d.ts файлы вместо default что бы
//         // работали такие импорты import { btn } from './Button.module.scss';
//         namedExport: true,

//         // преобразует имя класса btn-primary в css файле в имя btnPrimary которое
//         // мы можем использовать при импорте и использовать в js так как js
//         // не поддреживает имена содержащие знак '-'
//         camelCase: true,

//         // эта надпись  будет появляться в каждом сгенерированом .d.ts файле
//         banner: '// Auto-generated. Do not edit.',

//         // здесь сказано что при сборке в dev режиме нужно сгенерировать или
//         // обновить d.ts файлы если это необходимо, а в prod режиме просто
//         // проверить. Это значит что если в .module.scss появились изменения
//         // и попытаемся выполнить сборку в prod режиме то сборка упадёт
//         // потому что этот лоадер просто сверит .module.scss с соответсующим .d.ts и ничего не сделает, а вот в dev режиме он приведёт их сначала с соответсвие поэтому сборка не упадёт
//         mode: isDev ? 'emit' : 'verify',
//     },
// },

// _______________________'css-loader'______________________
// esModule: true,
// нужна чтобы работал import * as styles, идёт по умолчанию,
// здесь для наглядности

// namedExport: true,
// нужна чтобы работал export const btn, а не default, идёт по умолчанию,
// здесь для наглядности. Если установить в false то будут
// рабоать default импоты import styles from some.module.css
// но это устаревший подход

// exportLocalsConvention: 'as-is',
// чтобы оставить имена классов как есть. Допустим был
// .btn-primary {color: red;} в Button.module.scss, после обработки
// которая настроена в localIdentName он например
// стал ._2f3aBcDe { color: red; } если данная опция 'as-is'
// то в js/ts экспортируется { "btn-primary": "_aBc123" }
// а если бы опция стояла например в camelCaseOnle то экспортировалось бы
// в { btnPrimary: "_aBc123" }

// auto: (resPath: string) => Boolean(resPath.includes('.module.')),
// функция проверки является ли файл модульным, если он таковым является то
// то он будет переименован по схеме из поля localIdentName. без этого поля по умолчанию
// это происходилобы со всеми файлами и module.css и просто .css

// localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
// если изначально в .module.scss .myClass { color: red; } то получим что-вроде
//  .src_components_Button_style__myClass {color: red;} в dev сборке
// или ._2f3aBcDe { color: red; } в prod сборке

// ________________________svgLoader_________________________________________

// oneOf — это массив альтернативных вариантов обработки одного и того же типа файлов.
// Webpack выберет только первое совпавшее правило из oneOf.
// Это помогает избежать конфликтов — как только найдено совпадение, остальное игнорируется.
// resourceQuery: /react/ указывает что нужно использовать svgrLoader для обработки svg. Это сработает если в
// импорте указан путь ?react например Применяется, если в импортируемом пути есть ?react, например: import Icon from './icon.svg?react';
// в этом случае Icon будет импортирован как React компонент.
// Если импортируем просто  import icon from './icon.svg то будет использован встроенныый в webpack 'asset/resource' loader и svg будет
// импортирован просто как svg файл. Так же в d.ts файле нужно указать typescript rfr обрабать .svg?react и просто .svg
