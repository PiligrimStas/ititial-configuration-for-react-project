// prettier.config.js
/** @type {import('prettier').Config} */
export default {
    tabWidth: 4, // 4 пробела вместо 2
    semi: true, // ставим точку с запятой
    singleQuote: true, // используем одинарные кавычки
    trailingComma: 'all', // запятые в конце объектов/массивов
    bracketSpacing: true, // пробелы внутри объектов: { foo: bar }
    bracketSameLine: false, // перенос закрывающей скобки JSX на новую строку
    arrowParens: 'always', // всегда оборачиваем параметры стрелочной функции в скобки
    printWidth: 100,
};
