// buildLoaders.ts
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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

export function buildLoaders({ useEsbuild, isDev }: BuildOptions): webpack.RuleSetRule[] {
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

    return [typescriptLoader, scssModuleLoader, scssGlobalLoader];
    // const cssLoader = {
    //     test: /\.s[ac]ss$/i,
    //     use: [
    //         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    //         {
    //             loader: 'css-modules-dts-loader',
    //             options: {
    //                 namedExport: true,
    //                 camelCase: true,
    //                 banner: '// Auto-generated. Do not edit.',
    //                 mode: isDev ? 'emit' : 'verify',
    //             },
    //         },
    //         {
    //             loader: 'css-loader',
    //             options: {
    //                 esModule: true,
    //                 modules: {
    //                     namedExport: true,
    //                     exportLocalsConvention: 'as-is',

    //                     auto: (resPath: string) => Boolean(resPath.includes('.module.')),
    //                     localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
    //                 },
    //             },
    //         },
    //         'sass-loader',
    //     ],
    // };

    // return [
    //     {
    //         test: /\.tsx?$/,
    //         exclude: /node_modules/,
    //         use: useEsbuild
    //             ? {
    //                   loader: 'esbuild-loader',
    //                   options: {
    //                       loader: 'tsx',
    //                       target: 'es2020',
    //                   },
    //               }
    //             : {
    //                   loader: 'ts-loader',
    //               },
    //     },
    //     cssLoader,
    // ];
}

//__________________________________________коментарии к настройкам загрузчиков____________________________________________________
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
//нужна чтобы работал export const btn, а не default, идёт по умолчанию,
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
