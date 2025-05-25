import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import Cache from 'i18next-localstorage-cache';

i18n.use(Cache) // Кэшируем переводы в localStorage
    .use(Backend) // Загружаем JSON переводы асинхронно
    .use(LanguageDetector) // Определяем язык пользователя
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // язык по умолчанию, если не найден
        supportedLngs: ['en', 'ru'], // явно перечисляем поддерживаемые языки

        // Где лежат переводы
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        // Настройки кэша
        cache: {
            enabled: true,
            prefix: 'i18next_res_',
            expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 дней
        },

        // Определение языка
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        ns: ['common', 'main', 'about'], // список неймспейсов по умолчанию (имён json файлов по умолчанию)
        defaultNS: 'common', // значит что переводы при вызове useTranslation() без параметра будут браться в файле common.json если не указывать это поле то п умолчанию i18next будет искать переводы в файлу translstions.json

        interpolation: {
            escapeValue: false, // React сам экранирует
        },

        // debug: import.meta.env?.DEV ?? false, // если бы использовался vite
        debug: __IS_DEV__,
    });

export default i18n;

// .use(Cache)
// .use(Backend)
// .use(LanguageDetector)
// .use(initReactI18next)
// Cache — включает кэширование переводов в localStorage (через i18next-localstorage-cache), чтобы не загружать их повторно.
// Backend — позволяет загружать JSON-файлы переводов с сервера или из public/locales/....
// LanguageDetector — определяет язык пользователя (из localStorage, navigator.language, query, cookie и др.).
// initReactI18next — адаптер, который связывает i18next с React (хуки useTranslation, компоненты Trans и т.д.).

// fallbackLng: 'en',
// Если не найден язык, подходящий пользователю — будет использоваться этот.
// Также используется, если произошла ошибка загрузки нужного JSON-файла.

// supportedLngs: ['en', 'ru'] - Список языков, которые поддерживает приложение.
// Все другие (например, en-GB, ru-KZ) будут обрезаны до en, ru автоматически.

// backend: {
//     loadPath: '/locales/{{lng}}/{{ns}}.json',
//   },
//   Указывает путь к JSON-файлам переводов.
//   {{lng}} — язык (en, ru), {{ns}} — неймспейс (mainPage, aboutPage, common, и т.д.).
//   Физически эти файлы лежат в public/locales.

// cache: {
//     enabled: true,
//     prefix: 'i18next_res_',
//     expirationTime: 7 * 24 * 60 * 60 * 1000,
//   },
//   enabled: true — включает кэширование JSON-файлов.
//   prefix — как будут называться ключи в localStorage, например: i18next_res_en_common.
//   expirationTime — как долго кэш хранится (здесь: 7 дней в миллисекундах).

// detection: {
//     order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
//     caches: ['localStorage'],
//   },
//   order — порядок, в котором i18next будет искать активный язык:
//   localStorage — если пользователь уже выбирал язык.
//   cookie — если был сохранён язык на сервере (актуально для SSR).
//   navigator — язык браузера (navigator.language).
//   htmlTag — атрибут lang на <html>.
//   caches — где сохранить найденный язык для последующих загрузок.
//   В нашем случае это localStorage.

// ns: ['common'],
// defaultNS: 'common',
// ns (namespaces) — список неймспейсов, доступных по умолчанию.
// Обычно common содержит общие фразы (Save, Cancel, Page Not Found и т.п.).
// defaultNS — используется, если в useTranslation() не указать явно неймспейс.

// interpolation: {
//     escapeValue: false,
//   },
//   Отвечает за подстановку переменных в строках (например: {{name}}).
//   escapeValue: false — нужно оставить false, если используешь React, иначе символы (<, >) будут экранироваться и ломать JSX.

// debug: import.meta.env?.DEV ?? false,
// Выводит отладочную информацию (console.log) в режиме разработки.
// Удобно для проверки загрузки языков и неймспейсов.
