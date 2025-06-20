// webpack.config.ts
import path from 'path';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';

import type { BuildEnv, BuildPaths } from './config/build/types/config';
import type webpack from 'webpack';

export default (env: BuildEnv): webpack.Configuration => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'), // попадёт в поле entry
        build: path.resolve(__dirname, 'build'), // попадёт в поле output
        html: path.resolve(__dirname, 'public', 'index.html'), // путь до входного index.html это файл нужен HTMLWebpackPlugin что бы на его основе сгенерировать новый выходной файл
        src: path.resolve(__dirname, 'src'), // путь до папки от корорый будем плясать при импортах, нужен в поле resolve
        // что бы работали переводы нужен copy-webpack-plugin
        locales: path.resolve(__dirname, 'public', 'locales'), // где брать переводы в prod режиме
        buildLocales: path.resolve(__dirname, 'build', 'locales'), // куда переместить переводы при prod режиме
    };
    const mode = env.mode ?? 'development'; // попадёт в поле mode читаем либо значение из env либо development если env не передано
    const isDev = mode === 'development'; // используется как условие подлючение чего либо в некоторых полях конфига
    const PORT = env.port ?? 3000; // попадает в вызов webpackDevServer
    const useEsbuild = false; // попадает в вызов buildLoaders, в зависимости от её значчения будет выбран соответствущий ts загрузчик
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        useEsbuild,
        port: PORT,
    });

    return config;
};
