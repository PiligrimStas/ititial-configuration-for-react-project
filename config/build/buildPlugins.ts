// buildPlugings.ts

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import type { BuildOptions } from "./types/config";

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html, // путь до входного файла на основе которого будет создан выходной index.html в build с уже подключеными к нему всеми необходимыми скриптами стилями и т.д.
        }),
        new webpack.ProgressPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
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

// webpack.DefinePlugin Плагин создаёт глобальные переменные доступные во всём приложении в любом его файле без всякого импорта

// ReactRefreshWebpackPlugin Нужен для корректной работы HRM с React. Например правильно работает с состоянием компоентов, помогает избежать лишних перезагрузок страницы при сохранении изменений
