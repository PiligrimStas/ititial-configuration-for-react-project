// buildPlugings.ts

import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html, // путь до входного файла на основе которого будет создан выходной index.html в build с уже подключеными к нему всеми необходимыми скриптами стилями и т.д.
        }),
        new webpack.ProgressPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ];
}

// HTMLWebpackPlugin который Создаёт HTML-файл в папке build/ (или dist/) и  и автоматически подключает к нему все твои сборочные бандлы (скрипты, стили)

// ForkTsCheckerWebpackPlugin выполняет проверку типов TypeScript в отдельном процессе
// Это позволяет не тормозить основную сборку и получать ошибки типов в терминал
// Особенно полезно в связке с esbuild-loader, который сам по себе типы не проверяет

// ProgressPlugin отображает прогресс сборки в консоли
// Полезен для понимания, на каком этапе сейчас находится webpack

// MiniCssExtractPlugin dыносит CSS в отдельные файлы вместо того, чтобы встраивать стили в
// JavaScript (как делает style-loader). Используется в продакшене. Ускоряет загрузку страницы (CSS грузится отдельно)
// Позволяет кэшировать стили браузером отдельно от JS. Уменьшает размер JS-бандла
// filename - определяет имя итогового CSS-файла для основного чанка (entry point)
// chunkFilename - определяет имя CSS-файлов для динамически загружаемых чанков (code splitting)
// именно это файл создаёт папку css с файлами стилей в папке build
