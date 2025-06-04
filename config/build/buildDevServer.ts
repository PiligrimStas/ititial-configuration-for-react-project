// buildDevServer.ts
import type { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'; // здесь мы переименовали импорт типа что бы он не пересекался с одноимённым типам самого webpack


export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // это опция указывает на то что бразузер должен автоматически открывать страницу с нашим приложениемю
        historyApiFallback: true, // одна из важнейших опций при разработке SPA-приложений, особенно если юзать React Router (или другой клиентский роутинг).
        // Эта опция говорит webpack-dev-server: "Если пользователь перешёл по нестандартному
        //  маршруту (например, /about, /profile, /dashboard), не выбрасывай 404, а отдай index.html!"
        hot: true, // включаем HMR (раньше подключался в plugings, сейчас так как используем dev-server в plugins подключать явно не нужно достаточно включить здесь)
        client: {
            logging: 'warn', // Показывать базовые сообщения сборки в консоли браузера (ещё можно можно 'silent', 'error', 'warn', 'info', 'log', 'verbose')
            overlay: {
                errors: true, // Показывать ошибки как overlay
                warnings: false, // В варнингах смысла мало, не засоряем интерфейс
            },
            progress: true, // Показываем прогресс сборки в консоли браузера
            reconnect: true, // Полезно при нестабильном соединении или после сна
        },
    };
}
