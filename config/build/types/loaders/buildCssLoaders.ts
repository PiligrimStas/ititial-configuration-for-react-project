import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { RuleSetRule, RuleSetUseItem } from 'webpack';

// Функция генерации набора загрузчиков для стилей
function getStyleLoaders(isModule: boolean, isDev: boolean): RuleSetUseItem[] {
    return [
        // В DEV режиме используем style-loader для внедрения стилей в <style> теги
        // В PROD режиме выносим стили в отдельные файлы через MiniCssExtractPlugin
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

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

//главная функция, которая пригодится и в Storybook, и в основной сборке
export function buildCssLoaders(isDev: boolean): RuleSetRule[] {
    return [
        {
            // Загрузчик для модульных SCSS файлов (*.module.scss)
            test: /\.module\.s[ac]ss$/i,
            use: getStyleLoaders(true, isDev),
        },
        {
            // Загрузчик для глобальных SCSS файлов (всех остальных *.scss)
            test: /\.s[ac]ss$/i,
            exclude: /\.module\.s[ac]ss$/i,
            use: getStyleLoaders(false, isDev),
        },
    ];
}

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
