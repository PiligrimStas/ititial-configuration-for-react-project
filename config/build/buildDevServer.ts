// buildDevServer.ts
import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'; // здесь мы переименовали импорт типа что бы он не пересекался с одноимённым типам самого webpack

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // это опция указывает на то что бразузер должен автоматически открывать страницу с нашим приложениемю
        historyApiFallback: true, // одна из важнейших опций при разработке SPA-приложений, особенно если ты используешь React Router (или другой клиентский роутинг).
        // Эта опция говорит webpack-dev-server: "Если пользователь перешёл по нестандартному
        //  маршруту (например, /about, /profile, /dashboard), не выбрасывай 404, а отдай index.html!"
    };
}
