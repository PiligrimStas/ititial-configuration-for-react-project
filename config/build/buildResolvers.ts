// buildResolvers.ts
import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'], // расширения файлов, которые Webpack будет учитывать при разрешении импорта Например у нас import Button from './components/Button';
        // Webpack попробует найти файл поочередно: ./components/Button.tsx, ./components/Button.ts ./components/Button.js Эта настройка позволяет не указывать при импортах расшерения те вайлов которые в ней указаны
        preferAbsolute: true, // Указывает Webpack, чтобы он в первую очередь пытался найти абсолютные пути.
        modules: [options.paths.src, 'node_modules'], // Определяет, где Webpack будет искать модули. Это позволяет использовать aбсолюные пути при импортах из этих папок
        mainFiles: ['index'], // Указывает основной файл в папке, который Webpack будет использовать по умолчанию. Например у нас есть файл index.ts в папке Home и нам нужно чтото из него импортировать,
        // но в импорте мы можем просто написть import Home from './pages/Home'; без указания файла и расширения. webpack сай найдёт index файл и импортирует из него то что нужно
        alias: {}, // Позволяет задать псевдонимы для путей к файлам или модулям. Например alias: {'@': options.paths.src} import Button from '@/shared/classNames';
        // но у нас просто будет без "@" например просто import Button from 'shared/classNames'
    };
}
