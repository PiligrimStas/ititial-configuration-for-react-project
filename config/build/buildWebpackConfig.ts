// buildWebpackConfig.ts
import { BuildOptions } from './types/config';
import webpack from 'webpack';
import path from 'path';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode: mode,
        target: 'web',
        entry: paths.entry,
        output: {
            filename: isDev ? '[name].js' : '[name].[contenthash].js',

            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options), // пробрасывам все опции в плагины, так как там некоторые из них могут быть нужны
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : undefined, // эта опция нужна для того что бы в dev tools мы могли увидеть ошибку
        // в ихсходном файле, а не втом выходном большом который скомпилировал webpack при этом нам не нужна это опция при сборке в prod режиме
        // важно отключить эту опцию для prod режима потому что без неё в файле build/main.js будут содержаться подобные комментарии //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iYzI1NWNmYTY3OWRjMTkxZjY3Mi5qcyIsIm1hcHBpbmdzIjoibUJBQ0lBLFFBQVFDLElBQUksa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbml0aWFsY29uZmlndXJhdGlvbmZvcnJhY3Rwcm9qZWN0Ly4vc3JjL3Rlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNvbWVGbihhcmcpIHtcbiAgICBjb25zb2xlLmxvZygnUkFORE9NIEZVTkNUSU9OJyk7XG4gICAgcmV0dXJuICcnO1xufVxuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9

        devServer: isDev ? buildDevServer(options) : undefined, // запускаем devServer только при сборке в dev режиме
    };
}
