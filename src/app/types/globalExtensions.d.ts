// config/jest/globalExtensions.d.ts
// Этот файл расширяет глобальные типы Jest для поддержки toMatchImageSnapshot из jest-image-snapshot.
//
// ❗ Почему вынесено в отдельный файл, а не добавлено в global.d.ts?
// - В этом файле используется импорт типа (import type { ... }), а любой импорт превращает файл в модуль.
// - Если бы мы добавили этот импорт в global.d.ts, он стал бы модулем, и все глобальные объявления в нём перестали бы быть глобальными.
// - Чтобы не ломать всю суть global.d.ts ради одного импорта, мы решили вынести расширение Jest в отдельный файл.
// - Так мы сохранили чистоту глобальных типов проекта и позволили использовать импорты спокойно.
//
// - Дополнительно: локализация Jest-специфичных глобалов в отдельном файле повышает читаемость и упрощает поддержку.

import type { MatchImageSnapshotOptions } from 'jest-image-snapshot/types';

declare global {
    namespace jest {
        interface Matchers<R> {
            /**
             * Сравнивает изображение с эталонным image snapshot.
             * @param options Опции для кастомизации сравнения snapshot
             */
            toMatchImageSnapshot(options?: MatchImageSnapshotOptions): R;
        }
    }
}

export {};
