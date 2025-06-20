// main.ts
import path from 'path';
import { DefinePlugin, RuleSetRule } from 'webpack';

import { BuildPaths } from '../build/types/config';
import { buildCssLoaders } from '../build/types/loaders/buildCssLoaders';

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-docs',
        '@storybook/addon-onboarding',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    webpackFinal: async (config) => {
        const paths: BuildPaths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            locales: path.resolve(__dirname, 'public', 'locales'),
            buildLocales: path.resolve(__dirname, 'build', 'locales'),
        };

        // Абсолютные импорты
        config.resolve!.modules!.unshift(paths.src);
        config.resolve?.extensions?.push('.ts', '.tsx');

        // Обработка SVG (удаляем текущие и добавляем svgr)
        config.module!.rules = config
            .module!.rules!.filter((r): r is RuleSetRule => !!r && typeof r === 'object')
            .map((rule) => {
                if (/svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }
                return rule;
            });

        config.module!.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // SCSS-модули
        config.module!.rules.push(...buildCssLoaders(true));

        // Глобальные переменные
        config.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                // __API__: JSON.stringify(''),
                // __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return config;
    },
};
export default config;
