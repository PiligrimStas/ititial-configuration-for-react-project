// preview.ts — глобальная конфигурация Storybook (аналог .storybook/preview.js)
// Здесь мы задаём глобальные параметры, декораторы и настройки, применяемые ко всем историям

import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import type { Preview } from '@storybook/react-webpack5';

// Основная конфигурация preview
const preview: Preview = {
    parameters: {
        // Настройка панели Controls (справа от компонента в Canvas)
        // Автоматически определяет, какие пропсы считаются цветами или датами, чтобы показывать подходящий UI
        controls: {
            matchers: {
                color: /(background|color)$/i, // все пропсы, содержащие "background" или "color", получат color picker
                date: /Date$/i, // все пропсы, заканчивающиеся на "Date", получат date picker
            },
        },

        // Глобальные настройки автодокументации
        docs: {
            autodocs: true, // Включаем автогенерацию вкладки "Docs" для всех stories с tags: ['autodocs']
        },
    },

    // Глобальные декораторы применяются ко всем историям (например, обёртки, провайдеры тем и т.п.)
    decorators: [ThemeDecorator(), StyleDecorator, RouterDecorator],

    // Определяем глобальные переменные, доступные в context (например, в декораторах)
    // Эти значения также отображаются в Toolbar (верхняя панель интерфейса Storybook)
    globalTypes: {
        theme: {
            // теперь у нас будет возможность переключать глобальные темы приложения прямо в интерфейсе storybook, что избавляет нас от необходимости писать отдельные story под каждую тему и использовать в них ThemeDecorator.
            name: 'Theme', // Название в тулбаре
            description: 'Global theme for components', // Описание для документации
            defaultValue: 'light', // Значение по умолчанию
            toolbar: {
                icon: 'circlehollow', // Иконка в тулбаре
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark', title: 'Dark' },
                ],
            },
        },
    },
};

// Старый API через addDecorator устарел — заменён на массив decorators выше
// addDecorator(ThemeDecorator(Theme.LIGHT));
// addDecorator(StyleDecorator);
// addDecorator(RouterDecorator);

export default preview;
