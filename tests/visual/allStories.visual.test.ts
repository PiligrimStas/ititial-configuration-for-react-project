// allStoriesVisual.visual.test.ts
// Этот файл автоматически проходит по всем stories из Storybook и делает скриншоты для визуального тестирования.
// Подходит для регрессионных скриншотных тестов всего дизайн-сета.
// Используется вместе с jest-image-snapshot + puppeteer

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer, { Browser, Page } from 'puppeteer';

// Тип для index.json Storybook (минимально необходимая структура)
type StoryIndex = {
    entries: Record<
        string,
        {
            id: string;
            type: 'story' | 'docs';
            title: string;
            name: string;
            importPath: string;
            [key: string]: unknown;
        }
    >;
};

// Расширяем Jest matchers для поддержки toMatchImageSnapshot
expect.extend({ toMatchImageSnapshot });

describe('Visual regression testing for all stories', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        // Запуск браузера перед всеми тестами
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        // Закрытие браузера после всех тестов
        await browser.close();
    });

    it('should match snapshots for all stories', async () => {
        // Загружаем index.json с данными обо всех stories
        const response = await fetch('http://localhost:6006/index.json');
        if (!response.ok) {
            throw new Error(
                `Failed to fetch index.json: ${response.status} ${response.statusText}`,
            );
        }

        const { entries } = (await response.json()) as StoryIndex;

        // Обход всех entries
        for (const entry of Object.values(entries)) {
            // Пропускаем документы, тестируем только stories
            if (entry.type !== 'story') continue;

            const url = `http://localhost:6006/iframe.html?id=${entry.id}`;
            console.log(`📸 Testing: ${entry.id} → ${url}`);

            // Загружаем story
            await page.goto(url, { waitUntil: 'load' });

            // Отключаем анимации и transition для стабильности скринов
            await page.addStyleTag({
                content: `
          *,
          *::before,
          *::after {
            transition: none !important;
            animation: none !important;
          }
        `,
            });

            // Даем немного времени на стабилизацию рендера
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Делаем скриншот
            const screenshot = await page.screenshot();

            // Сравниваем с image snapshot
            expect(screenshot).toMatchImageSnapshot({
                // Задаём имя снимка по id story
                customSnapshotIdentifier: entry.id.replace(/\//g, '_'),
            });
        }
    }, 60000); // Увеличенный таймаут для всего теста, если stories много
});
