// stylelint.config.js

module.exports = {
    // Наследуем базовые правила для SCSS:
    // - включает стандартные рекомендации stylelint
    // - включает поддержку SCSS-синтаксиса (customSyntax указывать не нужно)
    extends: [
        'stylelint-config-standard-scss', // базовые правила + SCSS-специфика
        'stylelint-config-recess-order', // порядок CSS-свойств по методологии Recess
    ],

    //  Подключаем сторонний плагин для контроля порядка:
    // - 'order/properties-order' уже активирован через recess-order
    // - 'order/order' подключаем ниже вручную
    plugins: ['stylelint-order'],

    overrides: [
        // ✅ Затем — обычные scss (kebab-case), исключаем модули
        {
            files: ['**/*.scss'],
            excludedFiles: ['**/*.module.scss'], // ⚠️ Важно!
            rules: {
                'selector-class-pattern': '^[a-z0-9\\-]+$', // kebab-case
            },
        },
        // ✅ Сначала — правило для module.scss (camelCase)
        {
            files: ['**/*.module.scss'],
            rules: {
                'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$', // camelCase
            },
        },
    ],

    rules: {
        //  Требуем использовать camelCase в именах классов
        // (подходит для SCSS-модулей и компонентов)
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',

        //  Контролируем порядок блоков внутри селектора:
        // 1. CSS-переменные (--var)
        // 2. SCSS-переменные ($var)
        // 3. Директивы @use / @import / @forward
        // 4. Обычные CSS-свойства
        // 5. Миксины @include
        // 6. Вложенные правила (например, &__title)
        'order/order': [
            [
                'custom-properties',
                'dollar-variables',
                'at-variables',
                'declarations',
                {
                    type: 'at-rule',
                    name: 'include',
                },
                'rules',
            ],
        ],
    },
};
