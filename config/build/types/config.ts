// config.ts

// этот тип опсывает в каком режиме webpack будет собирать приложение, его значение будет переданно одним из параметров в
//  функцию buildWepackCongig, котоая будет возвращать объект конфигурации webpack. Значения этого типа попадёт в поле mode вебпак конфигурации
export type BuildMode = 'production' | 'development';

// этот интерфейс описывает типы объекта путей которые буде передваться в функцию buildWepackCongig, котоая будет возвращать объект конфигурации webpack
export interface BuildPaths {
    entry: string; // в этом поле путь до входного index.js или .ts этот путь получит поле entry webpck config
    build: string; // в этом поле будет передаваться путь куда будет сгенерирован выходной js файл, значение этого поля поучит поле output webpack config
    html: string; // путь до того самого index.html в котором наш <div class="root"></div> он нужен не самому webpck.config
    // а плагину HTMLWebpackPlugin который Создаёт HTML-файл в папке build/ (или dist/) и  и автоматически подключает к нему все твои сборочные бандлы (скрипты, стили)
    src: string; // поле указывает на  путь до папки с исходным кодом, будет использоваться в поле resolve weback.config
}

// этот интерфейс описывете тип объектка который будет передваться функцию в файлу webpack.config.ts которая возвращает сам config
// в этом объекте будет передваться значение env переменных, а это значение задаётся в командах поля scripts package.json
// например "build:prod": "webpack --env mode=production"
export interface BuildEnv {
    mode?: BuildMode;
    port?: number;
}

export interface BuildOptions {
    mode: BuildMode; // режим сборки
    paths: BuildPaths; // объект с путями необходимыми в конфиге webpack
    isDev: boolean; // используется как условие для подключение чего либо в некоторых полях webpack config
    useEsbuild?: boolean; // решает использовать ли esbuild-loader вместо ts-loader для ускорения разработки и быстрой сборки. (но без проверки типов)
    port: number; // в этой опции передаётся номер порта
}
